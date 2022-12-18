import pyrebase
import time
import datetime
from flask import Flask, redirect, render_template, session
from oauth2client.contrib.flask_util import UserOAuth2
from flask_socketio import SocketIO, emit
from haversine import haversine

TIME_MAXIMUM = 4
ITEM_LIST = {
    "hall": {
        "slot":"1",
        "cost":100,
        "name":"컨버전스 홀",
        "descript":"디지털 장비들이 가득한 웅장한 건물.<br>밤에 대학원생이 보인다는 괴담이 들린다."},
    "statue": {
        "slot":"2",
        "cost":75,
        "name":"독수리 동상",
        "descript":"금방이라도 날아갈 것 같은 독수리 동상.<br>자세히 관찰해보면 눈에 CCTV가 달려있다."},
    "dog_down": {
        "slot":"4",
        "cost":50,
        "name":"졸려요..",
        "descript":"잠이 많은 아기 강아지.<br>하루 24시간 중 18시간을 자는 것 같다."},
    "dog_sit": {
        "slot":"4",
        "cost":50,
        "name":"간식주세요!",
        "descript":"간식 앞에서는 말을 잘 듣는 강아지.<br>침을 줄줄 흘릴지도 모른다!"},
    "dog_stand": {
        "slot":"4",
        "cost":0,
        "name":"어디갈까요?",
        "descript":"호기심 많은 아기 강아지.<br>기본으로 지급되는 동작이다."}
    }

app = Flask(__name__)
app.config['SECRET_KEY'] = "DELETED"
app.config['GOOGLE_OAUTH2_CLIENT_ID'] = 'DELETED'
app.config['GOOGLE_OAUTH2_CLIENT_SECRET'] = 'DELETED'
oauth2 = UserOAuth2(app)
socketio = SocketIO(app)

config = {
    "apiKey": "DELETED",
    "authDomain": "DELETED",
    "databaseURL": "DELETED",
    "projectId": "DELETED",
    "storageBucket": "DELETED",
    "messagingSenderId": "DELETED",
    "appId": "DELETED",
    "measurementId": "DELETED"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def isConnect() :
    if oauth2.has_credentials() :
        if 'loginUser' in session :
            return True
        else :
            emit('response', {'msg':'sessionFail'})
    else :
        emit('response', {'msg':'invalidUser'})
    return False

def sendMail(sender, context) :
    msg = ''
    user = db.child("Users").child(context['receiver']).get().val()
    if user != None :
        result = dict()
        idx = 0
        for m in user['mailbox'] :
            result[idx] = m
            idx += 1
        context['sender'] = sender
        context['isRead'] = "False"
        result[idx] = context
        db.child("Users").child(context['receiver']).child("mailbox").set(result)
        msg = 'sendMail'
    else :
        msg = 'notExistUser'
    return msg

def hasBlock(userID) :
    block = db.child("Users").child(userID).child("block").get().val()
    if block <= int(time.time()) :
        db.child("Users").child(userID).child("block").set(0)
        block = 0
    if block > 0 :
        return True
    else :
        return False

def ploggingStop(joinMembers, ploggingID) :
    for m in joinMembers :
        if db.child("Users").child(m).get().val() != None :
            db.child("Users").child(m).child("currentPlogging").set("")
            plastic = db.child("Users").child(m).child("plastic").get().val()
            addPlastic = int((time.time() - joinMembers[m]) / 60)
            if addPlastic > 60 * TIME_MAXIMUM :
                addPlastic = 60 * TIME_MAXIMUM
            db.child("Agora").child(session['loginUser']).child("joinMembers").child(m).set(int(time.time()))
            db.child("Users").child(m).child("plastic").set(plastic + addPlastic)
            context = {
                "title":"플로깅 보상 지급 안내",
                "date":int(time.time()*1000),
                "context":"박사님께서 활동하신 플로깅에 대해 보상을 지급하였습니다!<br>보상내용 : 플라스틱 " + str(addPlastic) + "개<br>환경정화에 힘써주셔서 감사합니다.",
                "receiver":m
                }
            sendMail("ADMIN", context)
    db.child("Agora").child(ploggingID).remove()

@app.route('/')
def main() :
    loginState = ""
    if oauth2.has_credentials() :
        loginState = "로그인성공"
        if db.child("Users").child(oauth2.user_id).get().val() == None :
            db.child("Users").child(oauth2.user_id).update({
                "mailbox" : [""],
                "currentPlogging" : "",
                "ploggingHistory" : [""],
                "volunteerHistory" : [""],
                "level" : 1,
                "items" : {"void":True, "dog_stand":"slot4"},
                "equipItems" : {"void":True, "slot4":"dog_stand"},
                "plastic" : 1000,
                "setting" : {"lang":"ko", "view":"default"},
                "block" : 0,
                "blockCount" : 0
            })
            context = {
                "context" : "플로깅의 세계에 오신것을 환영합니다.<br>아직은 베타기간이므로 플라스틱 1000개를 지급하였습니다.",
                "title" : "가입을 축하합니다.",
                "receiver" : session['loginUser'],
                "date" : int(time.time()*1000)
            }
            sendMail("ADMIN", context)
            print("첫 유저")
        else :
            print("기존 유저")
    elif 'state' in session :
        loginState = "로그인실패"
    return render_template('index.html', loginFail=loginState)

@app.route('/login')
@oauth2.required
def login() :
    if oauth2.has_credentials() :
        # 로그인 성공 : DB에 유저 정보 탐색 후 뉴비인지 아닌지 검사
        # 뉴비면 DB에 정보 넣고, 게임 페이지로 이동하여 튜토리얼 시작
        # 기존 유저면 게임 페이지 이동
        session['loginUser'] = oauth2.user_id
    else :
        # 로그인 실패 : 로그인 페이지로 리다이렉트
        session['state'] = False
    return redirect('/')

@app.route('/logout')
def logout() :
    if 'loginUser' in session :
        del session['loginUser']
    if 'state' in session :
        del session['state']
    session.modified = True
    oauth2.storage.delete()
    return redirect('/')

# session['loginUser'] => oauth2.user_id로 치환
@socketio.on('request')
def request(json) :
    if isConnect() :
        try :
            # 초기화
            if json['msg'] == 'initialize' :
                user = db.child("Users").child(session['loginUser']).get().val()
                currentPloggingID = user['currentPlogging']
                currentPlogging = db.child("Agora").child(currentPloggingID).get().val()
                startPloggingTime = None
                ploggingStartPoint = None
                hostLocation = False
                alreadyJoin = False
                equipItems = user["equipItems"]
                plastic = user["plastic"]
                if currentPloggingID != "" :
                    if currentPlogging != None :
                        ploggingStartPoint = {
                                    "state":currentPlogging['state'],
                                    "country":currentPlogging['country'],
                                    "zone":currentPlogging['zone'],
                                    "section":currentPlogging['section']
                                }
                        if "joinMembers" in currentPlogging :
                            startPloggingTime = currentPlogging['date']
                            hostLocation = True
                            if session['loginUser'] in currentPlogging['joinMembers'] :
                                alreadyJoin = True
                        else :
                            now = int(time.time())
                            year = currentPlogging['date']['y']
                            month = currentPlogging['date']['M']
                            day = currentPlogging['date']['d']
                            hour = currentPlogging['date']['h']
                            minute = currentPlogging['date']['m']
                            startTime = int(datetime.datetime(year, month, day, hour, minute, 0, 0).timestamp())
                            if now - startTime >= 300 :
                                blockCount = user['blockCount'] + 1
                                db.child("Agora").child(currentPloggingID).remove()
                                db.child("Users").child(session['loginUser']).child("blockCount").set(blockCount)
                                db.child("Users").child(session['loginUser']).child("block").set(now + (259200 * blockCount))
                                db.child("Users").child(session['loginUser']).child("currentPlogging").set("")
                                context = {
                                    "title" : "플로깅 노쇼 제재 안내",
                                    "context" : "플로깅 노쇼로 인해 게시판 사용이 제한되었습니다.<br>제재 기간 : " + str(3*blockCount) + "일<br>제재 누적 횟수 : " + str(blockCount) + "번",
                                    "date" : int(time.time()*1000),
                                    "receiver" : session['loginUser']
                                }
                                sendMail("ADMIN", context)
                            else :
                                startPloggingTime = currentPlogging['date']
                    else :
                        blockCount = user['blockCount'] + 1
                        db.child("Users").child(session['loginUser']).child("blockCount").set(blockCount)
                        db.child("Users").child(session['loginUser']).child("block").set(int(time.time()) + (259200 * blockCount))
                        db.child("Users").child(session['loginUser']).child("currentPlogging").set("")
                        context = {
                            "title" : "플로깅 노쇼 제재 안내",
                            "context" : "플로깅 노쇼로 인해 게시판 사용이 제한되었습니다.<br>제재 기간 : " + str(3*blockCount) + "일<br>제재 누적 횟수 : " + str(blockCount) + "번",
                            "date" : int(time.time()*1000),
                            "receiver" : session['loginUser']
                        }
                        sendMail("ADMIN", context)
                emit('response', {
                    'msg':'initialize',
                    'data': {
                        'userID':session['loginUser'],
                        'currentPlogging':currentPloggingID,
                        'ploggingStartPoint': ploggingStartPoint,
                        'startPloggingTime':startPloggingTime,
                        'alreadyJoin':alreadyJoin,
                        'hostLocation':hostLocation,
                        'equipItems':equipItems,
                        'itemList':ITEM_LIST,
                        'plastic': plastic
                        }
                    })
            # 게시글 목록 반환
            elif json['msg'] == 'getBoard' :
                if hasBlock(session['loginUser']) :
                    json = {0:db.child("Agora").child("0").get().val()}
                else :
                    json = db.child("Agora").get().val()
                emit('response', {'msg':'boardList', 'data':json})
            # 게시글 업로드
            elif json['msg'] == 'writeBoard' :
                if hasBlock(session['loginUser']) :
                    emit('response', {'msg':'hasBlock'})
                else :
                    users = db.child("Users").child(session['loginUser']).get().val()
                    if users['currentPlogging'] == "" :
                        if db.child("Agora").child(session['loginUser']).get().val() == None :
                            json['data']['memberList'] = [session['loginUser']]
                            json['data']['host'] = session['loginUser']
                            json['data']['hostLocation'] = ""
                            db.child("Users").child(session['loginUser']).update({'currentPlogging':session['loginUser']})
                            db.child("Agora").child(session['loginUser']).update(json['data'])
                            emit('response', {'msg':'successUpload', 'data':json['data']['date']})
                        else :
                            emit('response', {'msg':'alreadyPost'})
                    else :
                        emit('response', {'msg':'alreadyPlogging'})
            # 게시글 삭제
            elif json['msg'] == 'deleteBoard' :
                currentPloggingID = db.child("Users").child(session['loginUser']).get().val()['currentPlogging']
                currentPlogging = db.child("Agora").child(currentPloggingID).get().val()
                now = int(time.time())
                year = currentPlogging['date']['y']
                month = currentPlogging['date']['M']
                day = currentPlogging['date']['d']
                hour = currentPlogging['date']['h']
                minute = currentPlogging['date']['m']
                startTime = int(datetime.datetime(year, month, day, hour, minute, 0, 0).timestamp())
                if startTime - now > 3600 : 
                    if db.child("Agora").child(session['loginUser']).get().val() != None :
                        memberList = db.child("Agora").child(session['loginUser']).child('memberList').get().val()
                        context = {
                            "title":"플로깅 취소 안내",
                            "date":int(time.time()*1000),
                            "context":"박사님께서 참가 중이었던 플로깅을 취소하게 되었습니다.<br>죄송합니다."
                            }
                        for m in memberList :
                            if m != session['loginUser'] :
                                db.child("Users").child(m).update({'currentPlogging':""})
                                context['receiver'] = m
                                sendMail(session['loginUser'], context)
                        db.child("Agora").child(session['loginUser']).remove()
                        db.child("Users").child(session['loginUser']).update({'currentPlogging':""})
                        emit('response', {'msg':'deletePost'})
                    else :
                        emit('response', {'msg':'postNotExist'})
                else :
                    emit('response', {'msg':'notChangePlogging'})
            # 플로깅 참가
            elif json['msg'] == 'joinPlogging' :
                if hasBlock(session['loginUser']) :
                    emit('response', {'msg':'hasBlock'})
                else :
                    users = db.child("Users").child(session['loginUser']).get().val()
                    if users['currentPlogging'] == "" :
                        board = db.child("Agora").child(json['data']).get().val()
                        if board != None :
                            if board['maxMember'] - len(board['memberList']) > 0 :
                                result = dict()
                                idx = 0
                                board['memberList'].append(session['loginUser'])
                                for m in board['memberList'] :
                                    result[idx] = m
                                    idx += 1
                                date = db.child("Agora").child(json['data']).child("date").get().val()
                                db.child("Users").child(session['loginUser']).update({'currentPlogging':json['data']})
                                db.child("Agora").child(json['data']).child('memberList').update(result)
                                emit('response', {'msg':'joinPlogging', 'data':{"ploggingID" : json['data'], "date":date}})
                            else :
                                emit('response', {'msg':'fullMember'})
                        else :
                            emit('response', {'msg':'postNotExist'})
                    else :
                        emit('response', {'msg':'alreadyPlogging'})
            # 플로깅 참가 취소
            elif json['msg'] == 'leftPlogging' :
                board = db.child("Agora").child(json['data']).get().val()
                if board != None :
                    if session['loginUser'] in board['memberList'] :
                        currentPloggingID = db.child("Users").child(session['loginUser']).get().val()['currentPlogging']
                        currentPlogging = db.child("Agora").child(currentPloggingID).get().val()
                        now = int(time.time())
                        year = currentPlogging['date']['y']
                        month = currentPlogging['date']['M']
                        day = currentPlogging['date']['d']
                        hour = currentPlogging['date']['h']
                        minute = currentPlogging['date']['m']
                        startTime = int(datetime.datetime(year, month, day, hour, minute, 0, 0).timestamp())
                        if startTime - now > 3600 :
                            result = dict()
                            idx = 0
                            for m in board['memberList'] :
                                if m != session['loginUser'] :
                                    result[idx] = m
                                    idx += 1
                            db.child("Users").child(session['loginUser']).update({'currentPlogging':""})
                            db.child("Agora").child(json['data']).child('memberList').set(result)
                            emit('response', {'msg':'leftPlogging'})
                        else :
                            emit('response', {'msg':'notChangePlogging'})
                    else :
                        emit('response', {'msg':'notExistMember'})
                else :
                    emit('response', {'msg':'postNotExist'})
            # 메일 전송
            elif json['msg'] == 'sendMail' :
                if session['loginUser'] != json['data']['receiver'] :
                    stateMsg = sendMail(session['loginUser'], json['data'])
                    emit('response', {'msg':stateMsg})
                else :
                    emit('response', {'msg':'noSendSelf'})
            # 메일함
            elif json['msg'] == 'getMailList' :
                mailList = db.child("Users").child(session['loginUser']).child("mailbox").get().val()
                del mailList[0]
                emit('response', {'msg':'mailList', 'data':mailList})
            # 메일 삭제
            elif json['msg'] == 'deleteMail' :
                mailList = db.child("Users").child(session['loginUser']).child("mailbox").get().val()
                if len(mailList) > 0 :
                    del mailList[0]
                    result = {0:""}
                    count = 1
                    idx = 1
                    for mail in mailList :
                        if str(count) not in json['data'] :
                            result[idx] = mail
                            idx += 1
                        count += 1
                    db.child("Users").child(session['loginUser']).child("mailbox").set(result)
                emit('response', {'msg':'deletedMail'})
            # 메일 읽음
            elif json['msg'] == 'readMail' :
                isExist = db.child("Users").child(session['loginUser']).child("mailbox").child(json['data']['idx']).get().val()
                if isExist != None :
                    db.child("Users").child(session['loginUser']).child("mailbox").child(json['data']['idx']).update({"isRead":json['data']['date']})
                    emit('response', {'msg':'readMail', 'data':json['data']['idx']})
                else :
                    emit('response', {'msg':'notExistMail'})
            # 위치 찍기
            elif json['msg'] == 'getLocation' :
                currentPloggingID = db.child("Users").child(session['loginUser']).get().val()['currentPlogging']
                currentPlogging = db.child("Agora").child(currentPloggingID).get().val()
                now = int(time.time())
                year = currentPlogging['date']['y']
                month = currentPlogging['date']['M']
                day = currentPlogging['date']['d']
                hour = currentPlogging['date']['h']
                minute = currentPlogging['date']['m']
                startTime = int(datetime.datetime(year, month, day, hour, minute, 0, 0).timestamp())
                if currentPlogging['hostLocation'] == "" :
                    if now - startTime >= 0 and now - startTime <= 180 :
                        if session['loginUser'] == currentPlogging['host'] :
                            db.child("Agora").child(currentPloggingID).child('hostLocation').update(json['data'])
                            db.child("Agora").child(currentPloggingID).child('joinMembers').update({session['loginUser']:now})
                            socketio.emit('response', {'msg':'hostPinLocation', 'data':{'currentPloggingID':currentPloggingID, 'userID':session['loginUser']}})
                        else :
                            emit('response', {'msg':'hostNotPinLocation'})
                    elif now - startTime < 0 :
                            emit('response', {'msg':'beforePloggingStart'})
                    else :
                        db.child("Agora").child(currentPloggingID).child('hostLocation').update(json['data'])
                        db.child("Agora").child(currentPloggingID).child('joinMembers').update({session['loginUser']:now})
                        socketio.emit('response', {'msg':'hostPinLocation', 'data':{'currentPloggingID':currentPloggingID, 'userID':session['loginUser']}})
                else :
                    if session['loginUser'] not in currentPlogging['joinMembers'] :
                        loc_1 = (currentPlogging['hostLocation']['latitude'], currentPlogging['hostLocation']['longitude'])
                        loc_2 = (json['data']['latitude'], json['data']['longitude'])
                        if int(haversine(loc_1, loc_2, unit='m')) <= 15 :
                            db.child("Agora").child(currentPloggingID).child('joinMembers').update({session['loginUser']:now})
                            emit('response', {'msg':'userPinLocation'})
                        else :
                            emit('response', {'msg':'distanceTooFar'})
                    else :
                        emit('response', {'msg':'alreadyPinLocation'})
            # 개인 플로깅 종료
            elif json['msg'] == 'stopPlogging' :
                currentPloggingID = db.child("Users").child(session['loginUser']).child("currentPlogging").get().val()
                if currentPloggingID != "" :
                    if session['loginUser'] != currentPloggingID :
                        joinMembers = db.child("Agora").child(currentPloggingID).child('joinMembers').get().val()
                        if joinMembers != None :
                            if session['loginUser'] in joinMembers :
                                currentPloggingID = db.child("Users").child(session['loginUser']).child("currentPlogging").get().val()
                                plastic = db.child("Users").child(session['loginUser']).child("plastic").get().val()
                                addPlastic = int((time.time() - joinMembers[session['loginUser']]) / 60)
                                if addPlastic > 60 * TIME_MAXIMUM :
                                    addPlastic = 60 * TIME_MAXIMUM
                                del joinMembers[session['loginUser']]
                                if len(joinMembers) > 0 :
                                    db.child("Agora").child(currentPloggingID).child("joinMembers").set(joinMembers)
                                else :
                                    db.child("Agora").child(currentPloggingID).remove()
                                db.child("Users").child(session['loginUser']).child("plastic").set(plastic + addPlastic)
                                db.child("Users").child(session['loginUser']).child("currentPlogging").set("")
                                context = {
                                    "title":"플로깅 보상 지급 안내",
                                    "date":int(time.time()*1000),
                                    "context":"박사님께서 활동하신 플로깅에 대해 보상을 지급하였습니다!<br>보상내용 : 플라스틱 " + str(addPlastic) + "개<br>환경정화에 힘써주셔서 감사합니다.",
                                    "receiver":session['loginUser']
                                    }
                                sendMail("ADMIN", context)
                                emit('response', {'msg':"stopPlogging"})
                            else :
                                emit('response', {'msg':"mustFirstStep"})
                        else :
                            emit('response', {'msg':"beforePloggingStart"})
                else :
                    emit('response', {'msg':"notExistMember"})
            # 호스트 플로깅 종료
            elif json['msg'] == 'stopPloggingByHost' :
                joinMembers = db.child("Agora").child(session['loginUser']).child('joinMembers').get().val()
                if joinMembers != None :
                    ploggingStop(joinMembers, session['loginUser'])
                    socketio.emit('response', {'msg':"stopPloggingByHost", 'data':session['loginUser']})
                else :
                    emit('response', {'msg':"beforePloggingStart"})
            # 시간초과된 플로깅 강제종료 처리
            elif json['msg'] == 'overTimePlogging' :
                joinMembers = db.child("Agora").child(json['data']).child('joinMembers').get().val()
                if joinMembers != None :
                    ploggingStop(joinMembers, json['data'])
                else :
                    db.child("Agora").child(json['data']).remove()
            # 상점목록 업데이트
            elif json['msg'] == 'updateShop' :
                user = db.child("Users").child(session['loginUser']).get().val()
                emit('response', {'msg':'updateShop', 'data':{'inventory':user['items'], 'itemList':ITEM_LIST, 'plastic':user['plastic']}})
            # 아이템 구매
            elif json['msg'] == 'buyItem' :
                itemName = json['data']['itemName']
                if itemName in ITEM_LIST :
                    user = db.child("Users").child(session['loginUser']).get().val()
                    if itemName not in user['items'] :
                        plastic = user['plastic']
                        if plastic >= ITEM_LIST[itemName]['cost'] :
                            item = {itemName : ("slot" + ITEM_LIST[itemName]['slot'])}
                            db.child("Users").child(session['loginUser']).child('plastic').set(plastic - ITEM_LIST[itemName]['cost'])
                            db.child("Users").child(session['loginUser']).child('items').update(item)
                            emit('response', {'msg':'buyItem', 'data':{'itemName':itemName, 'slot':"slot" + ITEM_LIST[itemName]['slot']}})
                        else :
                            emit('response', {'msg':'notEnoughPlastic'})
            # 아이템 장착
            elif json['msg'] == 'equipItem' :
                itemName = json['data']['itemName']
                if itemName in ITEM_LIST :
                    user = db.child("Users").child(session['loginUser']).get().val()
                    if itemName in user['items'] :
                        if json['data']['type'] == "equip" :
                            db.child("Users").child(session['loginUser']).child('equipItems').update({"slot" + ITEM_LIST[itemName]['slot']:itemName})
                            emit('response', {'msg':'equipItem'})
                        else :
                            del user['equipItems']["slot" + ITEM_LIST[itemName]['slot']]
                            db.child("Users").child(session['loginUser']).child('equipItems').set(user['equipItems'])
                            emit('response', {'msg':'unmountItem'})
            elif json['msg'] == 'test' :
                emit('response', {'msg':'send!'})
        except Exception as e :
            print(e)