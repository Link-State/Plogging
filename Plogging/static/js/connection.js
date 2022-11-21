const SOCKET = io.connect("http://" + document.domain + ":" + location.port);
const PATH = "http://" + document.domain + ":" + location.port + "";
let ITEMLIST = {};
let EQUIPED = {};

SOCKET.on('response', function(data) {
    if (data.msg === 'initialize') {

        USERID = data['data']['userID'];
        CURRENTPLOGGING = data['data']['currentPlogging'];
        EQUIPED = data['data']['equipItems'];
        ITEMLIST = data['data']['itemList'];

        // 요소 렌더링
        loadButton();
        loadBoard();
        loadPost();
        loadUserPost();
        loadMailBox();
        loadReceiveMailForm();
        loadMailForm();
        loadPlogging();
        loadShop();

        // 장착중인 아이템 이미지 불러옴
        let keys = Object.keys(EQUIPED);
        for (let key of keys) {
            let slot = document.getElementById(key);
            slot.style.backgroundImage = "url(" + PATH + "/static/image/" + EQUIPED[key] + ".png" + ")";
        }

        let background = document.getElementById('background');
        background.style.display = "block";

        if (CURRENTPLOGGING !== '') {
            if (data['data']['startPloggingTime'] !== null) {
                let year = data['data']['startPloggingTime']['y'];
                let month = data['data']['startPloggingTime']['M'];
                let day = data['data']['startPloggingTime']['d'];
                let hour = data['data']['startPloggingTime']['h'];
                let min = data['data']['startPloggingTime']['m'];
                START_TIME = new Date(year, month-1, day, hour, min).getTime();
                // START_TIME = Date.now()+3000;
                if (data['data']['alreadyJoin']) {
                    let ploggingNotice = document.getElementById('ploggingNotice');
                    let getLocationBtn = document.getElementById('getLocationBtn');
                    let stopPloggingBtn = document.getElementById('stopPloggingBtn');

                    ploggingNotice.innerHTML = '플로깅중...';
                    getLocationBtn.style.display = 'none';
                    getLocationBtn.style.color = 'gray';
                    getLocationBtn.onclick = '';
                    stopPloggingBtn.style.display = 'block';
                    stopPloggingBtn.onclick = stopPlogging;

                    ploggingView(true);
                }
                else if (data['data']['hostLocation']) {
                    let ploggingNotice = document.getElementById('ploggingNotice');
                    let getLocationBtn = document.getElementById('getLocationBtn');

                    ploggingNotice.innerHTML = '주최자가 기준위치를 찍었습니다. 위치를 찍으세요.';
                    getLocationBtn.style.color = 'black';
                    getLocationBtn.onclick = getLocation;

                    ploggingView(true);
                }
                else {
                    loadPloggingTimer();
                }
            }
        }
    }
    else if (data.msg === 'successUpload') {
        CURRENTPLOGGING = USERID;
        let post = document.getElementById('post');
    
        if (post.style.display !== "none") {
            post.style.display = "none";
        }
        
        let year = data['data']['y'];
        let month = data['data']['M'];
        let day = data['data']['d'];
        let hour = data['data']['h'];
        let min = data['data']['m'];
        START_TIME = new Date(year, month-1, day, hour, min).getTime();

        loadPloggingTimer();
        searchPost();
        alert('게시글을 올렸습니다.');
    }
    else if (data.msg === 'deletePost') {
        CURRENTPLOGGING = '';
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }
        START_TIME = -1;
        clearPloggingTimer();
        searchPost();
        alert('게시글이 삭제되었습니다.');
    }
    else if (data.msg === 'joinPlogging') {
        CURRENTPLOGGING = data['data']['ploggingID'];
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }

        let year = data['data']['date']['y'];
        let month = data['data']['date']['M'];
        let day = data['data']['date']['d'];
        let hour = data['data']['date']['h'];
        let min = data['data']['date']['m'];
        START_TIME = new Date(year, month-1, day, hour, min).getTime();

        loadPloggingTimer();
        searchPost();
        alert('플로깅에 참가가 완료되었습니다.');
    }
    else if (data.msg === 'leftPlogging') {
        CURRENTPLOGGING = '';
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }
        START_TIME = -1;
        clearPloggingTimer();
        searchPost();
        alert('해당 플로깅의 참가 취소가 완료되었습니다.');
    }
    else if (data.msg === 'sendMail') {
        let mail = document.getElementById('mail');
        let sendBtn = document.getElementById('mailSend');
        sendBtn.onclick = sendMail;

        if (mail.style.display !== "none") {
            mail.style.display = "none";
        }
        alert('메일이 전송되었습니다.');
    }
    else if (data.msg === 'deletedMail') {
        SOCKET.emit('request', {'msg':"getMailList"});
        alert('메일이 삭제되었습니다.');
    }
    else if (data.msg === 'readMail') {
        let idx = parseInt(data.data)-1;
        let mail = document.getElementsByClassName('user_mail');
        let notReadMailCount = document.getElementById('notReadMailCount');

        mail.item(idx).style.color = "gray";
        notReadMailCount.innerHTML = "안읽음 : " + (notReadMailCount.value - 1) + "건";
    }
    else if (data.msg === 'hostPinLocation') {
        if (data['data']['currentPloggingID'] === CURRENTPLOGGING) {
            if (data['data']['userID'] !== USERID) {
                let ploggingNotice = document.getElementById('ploggingNotice');
                let getLocationBtn = document.getElementById('getLocationBtn');
                
                ploggingNotice.innerHTML = '주최자가 기준위치를 찍었습니다. 위치를 찍으세요.';
                getLocationBtn.onclick = getLocation;
                getLocationBtn.style.color = 'black';
            }
            else {
                clearPloggingTimer();
                let ploggingNotice = document.getElementById('ploggingNotice');
                let getLocationBtn = document.getElementById('getLocationBtn');
                let stopPloggingBtn = document.getElementById('stopPloggingBtn');
                
                ploggingNotice.innerHTML = '플로깅중...';
                getLocationBtn.style.display = 'none';
                stopPloggingBtn.style.display = 'block';
                stopPloggingBtn.onclick = stopPlogging;
                alert("위치를 찍었습니다.");
            }
        }
    }
    else if (data.msg === 'userPinLocation') {
        let ploggingNotice = document.getElementById('ploggingNotice');
        let getLocationBtn = document.getElementById('getLocationBtn');
        let stopPloggingBtn = document.getElementById('stopPloggingBtn');
        
        ploggingNotice.innerHTML = '플로깅중...';
        getLocationBtn.style.display = 'none';
        stopPloggingBtn.style.display = 'block';
        stopPloggingBtn.onclick = stopPlogging;
        alert("위치를 찍었습니다.");
    }
    else if (data.msg === 'stopPlogging') {
        CURRENTPLOGGING = '';
        START_TIME = -1;
        clearPloggingTimer();
        ploggingView(false);
        alert("플로깅을 종료합니다.");
    }
    else if (data.msg === 'stopPloggingByHost') {
        if (data['data'] === CURRENTPLOGGING) {
            clearPloggingTimer();
            ploggingView(false);

            if (CURRENTPLOGGING === USERID) {
                alert('플로깅을 종료합니다.');
            }
            else {
                alert('주최자에 의해 플로깅이 종료되었습니다.');
            }
            CURRENTPLOGGING = '';
            START_TIME = -1;
        }
    }
    else if (data.msg === 'alreadyPost') {
        alert('더 이상 게시글을 올릴 수 없습니다.');
    }
    else if (data.msg === 'postNotExist') {
        alert('게시글이 존재하지 않습니다.');
    }
    else if (data.msg === 'fullMember') {
        alert('이미 인원이 가득 찼습니다.');
    }
    else if (data.msg === 'notExistMember') {
        alert('해당 플로깅에 참가중이지 않습니다.');
    }
    else if (data.msg === 'alreadyPlogging') {
        alert('이미 플로깅에 참가중입니다.');
    }
    else if (data.msg === 'noSendSelf') {
        let sendBtn = document.getElementById('mailSend');
        sendBtn.onclick = sendMail;
        alert('자기 자신에게는 메일을 보낼 수 없습니다.');
    }
    else if (data.msg === 'notChangePlogging') {
        alert('플로깅 시작 1시간 전에는 상태를 변경할 수 없습니다.');
    }
    else if (data.msg === 'beforePloggingStart') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        let stopPloggingBtn = document.createElement('div');
        getLocationBtn.onclick = getLocation;
        stopPloggingBtn.onclick = stopPlogging;
        alert('플로깅 시작 전 입니다.');
    }
    else if (data.msg === 'distanceTooFar') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.onclick = getLocation;
        alert('기준위치의 거리로부터 너무 멀리 떨어져있습니다.\n다시 위치를 찍어주세요.');
    }
    else if (data.msg === 'notExistMail') {
        alert('존재하지 않는 메일입니다.');
    }
    else if (data.msg === 'notExistUser') {
        alert('존재 하지 않는 유저입니다.');
    }
    else if (data.msg === 'hostNotPinLocation') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.onclick = getLocation;
        alert("호스트가 아직 위치 안찍음");
    }
    else if (data.msg === 'alreadyPinLocation') {
        alert("이미 위치 찍음");
    }
    else if (data.msg === 'sessionFail') {
        alert('세션이 끊어졌습니다. 다시 로그인 해주세요.');
    }
    else if (data.msg === 'invalidUser') {
        alert('존재하지 않는 유저입니다. 로그인 먼저 해주세요.');
    }
    else if (data.msg === 'boardList') {
        let searchBtn = document.getElementById('search');
        searchBtn.onclick = searchPost;
        boardUpdate(data['data']);
    }
    else if (data.msg === 'mailList') {
        mailBoxUpdate(data['data']);
    }
    else if (data.msg === 'hasBlock') {
        BLOCK = true;
        alert('일시적으로 사용이 제한되었습니다.');
    }
    else if (data.msg === 'send!') {
        console.log("response!");
    }
});

console.log('loaded connection.js');