const SOCKET = io.connect("https://" + document.domain + ":" + location.port);
// const PATH = "http://" + document.domain + ":" + location.port + "";
const PATH = "https://" + document.domain + ":" + location.port + "";
let ITEMLIST = {};
let EQUIPED = {};
let PLASTIC = 0;

SOCKET.on('response', function(data) {
    if (data.msg === 'initialize') {

        // 변수 초기화
        USERID = data['data']['userID'];
        CURRENTPLOGGING = data['data']['currentPlogging'];
        EQUIPED = data['data']['equipItems'];
        ITEMLIST = data['data']['itemList'];
        PLASTIC = data['data']['plastic'];
        PLOGGING_START_TIME = data['data']['startPloggingTime']
        PLOGGING_START_POINT = data['data']['ploggingStartPoint'];
        delete EQUIPED["void"];

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
        loadTutorial();
        onResize(false);
        window.addEventListener("resize", onResize);

        // window.addEventListener('click', audioPlay);

        // 적용중인 아이템 이미지 로드
        let keys = Object.keys(EQUIPED);
        for (let key of keys) {
            let slot = document.getElementById(key);
            slot.style.backgroundImage = "url(" + PATH + "/static/image/" + EQUIPED[key] + ".png" + ")";
            slot.value = EQUIPED[key];
        }

        // 메인화면 ON
        let background = document.getElementById('background');
        background.style.display = "block";

        // 플로깅 화면 구성
        if (CURRENTPLOGGING !== '') {
            if (PLOGGING_START_TIME !== null) {
                let year = PLOGGING_START_TIME['y'];
                let month = PLOGGING_START_TIME['M'];
                let day = PLOGGING_START_TIME['d'];
                let hour = PLOGGING_START_TIME['h'];
                let min = PLOGGING_START_TIME['m'];
                START_TIME = new Date(year, month-1, day, hour, min).getTime();
                // START_TIME = Date.now()+500;
                if (data['data']['alreadyJoin']) {
                    let ploggingNotice = document.getElementById('ploggingNotice');
                    let getLocationBtn = document.getElementById('getLocationBtn');
                    let stopPloggingBtn = document.getElementById('stopPloggingBtn');

                    ploggingNotice.innerHTML = '플로깅중...';
                    getLocationBtn.style.display = 'none';
                    getLocationBtn.style.color = 'gray';
                    getLocationBtn.onclick = '';
                    stopPloggingBtn.style.display = 'flex';
                    stopPloggingBtn.onclick = stopPlogging;

                    ploggingView(true);
                }
                else if (data['data']['hostLocation']) {
                    let ploggingNotice = document.getElementById('ploggingNotice');
                    let getLocationBtn = document.getElementById('getLocationBtn');

                    ploggingNotice.innerHTML = '주최자가 기준위치를 입력하였습니다.<br>현재 위치를 인증받으세요.';
                    getLocationBtn.style.color = 'white';
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
        actionMessage('게시글을 올렸습니다.');
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
        actionMessage('게시글이 삭제되었습니다.');
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
        actionMessage('플로깅에 참가가 완료되었습니다.');
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
        actionMessage('해당 플로깅의 참가 취소가 완료되었습니다.');
    }
    else if (data.msg === 'sendMail') {
        let mail = document.getElementById('mail');
        let sendBtn = document.getElementById('mailSend');
        sendBtn.onclick = sendMail;

        if (mail.style.display !== "none") {
            mail.style.display = "none";
        }
        actionMessage('메일이 전송되었습니다.');
    }
    else if (data.msg === 'deletedMail') {
        SOCKET.emit('request', {'msg':"getMailList"});
        actionMessage('메일이 삭제되었습니다.');
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
                
                ploggingNotice.innerHTML = '주최자가 기준위치를 입력하였습니다.<br>현재 위치를 인증받으세요.';
                getLocationBtn.onclick = getLocation;
                getLocationBtn.style.color = 'white';
            }
            else {
                clearPloggingTimer();
                let ploggingNotice = document.getElementById('ploggingNotice');
                let getLocationBtn = document.getElementById('getLocationBtn');
                let stopPloggingBtn = document.getElementById('stopPloggingBtn');
                
                ploggingNotice.innerHTML = '플로깅중...';
                getLocationBtn.style.display = 'none';
                stopPloggingBtn.style.display = 'flex';
                stopPloggingBtn.onclick = stopPlogging;
                actionMessage("위치를 인증받았습니다.");
            }
        }
    }
    else if (data.msg === 'userPinLocation') {
        let ploggingNotice = document.getElementById('ploggingNotice');
        let getLocationBtn = document.getElementById('getLocationBtn');
        let stopPloggingBtn = document.getElementById('stopPloggingBtn');
        
        ploggingNotice.innerHTML = '플로깅중...';
        getLocationBtn.style.display = 'none';
        stopPloggingBtn.style.display = 'flex';
        stopPloggingBtn.onclick = stopPlogging;
        actionMessage("위치를 인증받았습니다.");
    }
    else if (data.msg === 'stopPlogging') {
        CURRENTPLOGGING = '';
        START_TIME = -1;
        clearPloggingTimer();
        ploggingView(false);
        actionMessage("플로깅을 종료합니다.");
    }
    else if (data.msg === 'stopPloggingByHost') {
        if (data['data'] === CURRENTPLOGGING) {
            clearPloggingTimer();
            ploggingView(false);

            if (CURRENTPLOGGING === USERID) {
                actionMessage('플로깅을 종료합니다.');
            }
            else {
                actionMessage('주최자에 의해 플로깅이 종료됐습니다.');
            }
            CURRENTPLOGGING = '';
            START_TIME = -1;
        }
    }
    else if (data.msg === 'buyItem') {
        INVENTORY[data['data']['itemName']] = data['data']['slot'];

        let plasticAmount = document.getElementById('plasticAmount');
        let itemBuyBtn = document.getElementById(data['data']['itemName']+"_itemBuyBtn");
        let itemEquipBtn = document.getElementById(data['data']['itemName']+"_itemEquipBtn");
        let itemCost = document.getElementById(data['data']['itemName']+"_itemCost");

        plasticAmount.innerHTML = PLASTIC - ITEMLIST[data['data']['itemName']]['cost'] + "개";
        itemBuyBtn.style.display = "none";
        itemBuyBtn.onclick = "";
        itemEquipBtn.style.display = "flex";
        itemEquipBtn.onclick = itemEquip;
        itemEquipBtn.innerHTML = "적용";
        itemCost.innerHTML = "보유 중";

        actionMessage('아이템을 구매하였습니다.');
    }
    else if (data.msg === 'equipItem') {
        actionMessage("아이템을 적용하였습니다.");
    }
    else if (data.msg === 'unmountItem') {
        actionMessage("아이템을 해제하였습니다.");
    }
    else if (data.msg === 'alreadyPost') {
        actionMessage('더 이상 게시글을 올릴 수 없습니다.');
    }
    else if (data.msg === 'postNotExist') {
        actionMessage('게시글이 존재하지 않습니다.');
    }
    else if (data.msg === 'fullMember') {
        actionMessage('이미 인원이 가득 찼습니다.');
    }
    else if (data.msg === 'notExistMember') {
        actionMessage('해당 플로깅에 참가중이지 않습니다.');
    }
    else if (data.msg === 'alreadyPlogging') {
        actionMessage('이미 플로깅에 참가중입니다.');
    }
    else if (data.msg === 'noSendSelf') {
        let sendBtn = document.getElementById('mailSend');
        sendBtn.onclick = sendMail;
        actionMessage('자기 자신에게는 메일을 보낼 수 없습니다.');
    }
    else if (data.msg === 'notChangePlogging') {
        actionMessage('플로깅 시작 1시간 전에는 상태를 변경할 수 없습니다.');
    }
    else if (data.msg === 'beforePloggingStart') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        let stopPloggingBtn = document.createElement('div');
        getLocationBtn.onclick = getLocation;
        stopPloggingBtn.onclick = stopPlogging;
        actionMessage('플로깅 시작 전 입니다.');
    }
    else if (data.msg === 'mustFirstStep') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        let stopPloggingBtn = document.createElement('div');
        getLocationBtn.onclick = getLocation;
        stopPloggingBtn.onclick = stopPlogging;
        actionMessage('먼저 위치 인증을 받아야 합니다.');
    }
    else if (data.msg === 'distanceTooFar') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.onclick = getLocation;
        actionMessage('기준 위치로부터 너무 멀리 떨어져있습니다.\n다시 위치를 인증해주세요.');
    }
    else if (data.msg === 'notExistMail') {
        actionMessage('존재하지 않는 메일입니다.');
    }
    else if (data.msg === 'notExistUser') {
        actionMessage('존재 하지 않는 유저입니다.');
    }
    else if (data.msg === 'hostNotPinLocation') {
        let getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.onclick = getLocation;
        actionMessage("주최자가 아직 위치를 인증하지 않았습니다.");
    }
    else if (data.msg === 'alreadyPinLocation') {
        actionMessage("이미 위치를 인증하였습니다.");
    }
    else if (data.msg === 'notEnoughPlastic') {
        actionMessage("플라스틱이 부족합니다.");
    }
    else if (data.msg === 'sessionFail') {
        actionMessage('세션이 끊어졌습니다. 다시 로그인 해주세요.');
    }
    else if (data.msg === 'invalidUser') {
        actionMessage('존재하지 않는 유저입니다. 로그인 먼저 해주세요.');
    }
    else if (data.msg === 'boardList') {
        let searchBtn = document.getElementById('search');
        searchBtn.onclick = searchPost;
        boardUpdate(data['data']);
    }
    else if (data.msg === 'updateShop') {
        INVENTORY = data['data']['inventory'];
        ITEMLIST = data['data']['itemList'];
        PLASTIC = data['data']['plastic'];
        delete INVENTORY["void"];
        updateItemList();
    }
    else if (data.msg === 'mailList') {
        mailBoxUpdate(data['data']);
    }
    else if (data.msg === 'hasBlock') {
        BLOCK = true;
        actionMessage('일시적으로 사용이 제한됐습니다.');
    }
    else if (data.msg === 'send!') {
        console.log("response!");
    }
});

console.log('loaded connection.js');