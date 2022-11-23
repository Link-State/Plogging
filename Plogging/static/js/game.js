let USERID = '';
let CURRENTPLOGGING = '';
let PLOGGING_START_POINT = null;
let PLOGGING_START_TIME = null;
let BLOCK = false;
let TOGGLE = window.innerWidth / window.innerHeight > 1 ? "Mobile" : "PC";
const MENU_COUNT = 5;
const MENU_FX = [ploggingBoard, openMailBox, showView, null, null];

// 메인 요소 생성
function loadMain() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 배경
    let background = document.createElement('div');
    background.style.display = "none";
    background.id = "background";

    // 배경 -> 컨버전스홀
    let slot1 = document.createElement('div');
    slot1.id = "slot1";

    // 배경 -> 독수리상
    let slot2 = document.createElement('div');
    slot2.id = "slot2";
    
    // 배경 -> 해 및 달
    let slot3 = document.createElement('div');
    slot3.id = "slot3";

    // 배경 -> 강아지
    let slot4 = document.createElement('div');
    slot4.id = "slot4";

    // 배경 -> 풀떼기들
    let grass1 = document.createElement('div');
    grass1.id = 'grass1';
    grass1.className = 'grass';

    let grass2 = document.createElement('div');
    grass2.id = 'grass2';
    grass2.className = 'grass';

    let grass3 = document.createElement('div');
    grass3.id = 'grass3';
    grass3.className = 'grass';

    let grass4 = document.createElement('div');
    grass4.id = 'grass4';
    grass4.className = 'grass';

    // 배경음악
    // let bgm = document.createElement('audio');
    // bgm.src = PATH + "/static/sound/bgm.mp3";
    // bgm.controls = true;
    // bgm.autoplay = true;
    // bgm.loop = true;
    // bgm.id = "bgm";

    // background.appendChild(bgm);
    background.appendChild(grass1);
    background.appendChild(grass2);
    background.appendChild(grass3);
    background.appendChild(grass4);
    background.appendChild(slot4);
    background.appendChild(slot3);
    background.appendChild(slot2);
    background.appendChild(slot1);
    BODY.appendChild(background);

    // loadButton();
    // loadBoard();
    // loadPost();
    // loadUserPost();
    // loadMailBox();
    // loadReceiveMailForm();
    // loadMailForm();
    // loadPlogging();
    // loadShop();

    SOCKET.emit('request', {'msg':'initialize'});
    console.log("loaded main window");
    // background.style.display = "block";


    // [완료] 배경화면 div 크기 고정해서 브라우저 크기 줄이면 화면 잘리게끔 (ex.네이버 메인화면)
    // [완료] 화면 가로가 세로보다 더 짧아질 경우 배경화면 div의 height를 100%로 변경
    // [완료] ㄴ 이 때 아이템이 들어갈 슬롯들의 크기, 위치도 알맞게 변경
    // [완료] 컨버전스홀의 경우 어떠한 화면비에도 width는 꽉 차있어야함. 
    // [완료] ㄴ 최대 가로폭에 맞게 이미지 크기와 위치가 조정되어야함. (그 어떤 해상도의 사진이 들어와도!)
    // 배경화면은 x방향으로 repeat해도 자연스러운 이미지이어야함.

    // 메뉴1 : 플로깅 모집
    // 메뉴2 : 봉사활동 연계
    // 메뉴3 : 미니게임
    // 메뉴4 : 상점 
    // 메뉴5 : 설정
    
    // 각 슬롯들에 들어가는 이미지는 gif도 가능 (컨버전스홀, 독수리상, 강아지, 해 및 달)
    // 강아지를 꾸미는 방향 보다는 주변 환경을 꾸미는 방향으로 가는 것이 좋아보임. (개발적인 측면에사도)
    // 강아지는 다양한 동작까지는 구현 가능할것으로 예상됨.
}

// 메뉴 버튼 생성
function loadButton() {
    const BACKGROUND = document.getElementById("background");
    const CASCADING_MENU = (elem) => {
        let outter = document.createElement("div");
        outter.className = "outter";
        let middle = document.createElement("div");
        middle.className = "middle";
        middle.appendChild(elem);
        outter.appendChild(middle);
        return outter;
    };
    
    // 메뉴
    let menu = document.createElement("div");
    menu.style.display = "none";
    menu.id = "menu";

    // 메뉴바 배경
    let menuBackground = document.createElement("div");
    menuBackground.id = "menuBackground";

    // 메뉴 리스트
    let menuBox = document.createElement("div");
    menuBox.id = "menuBox";

    // 메일함
    let openMailBoxBtn = document.createElement("div");
    openMailBoxBtn.innerHTML = "메일함";
    openMailBoxBtn.className = "menuElem";
    openMailBoxBtn.onclick = openMailBox;
    openMailBoxBtn.id = "openMailBoxBtn";

    // 상점
    let openShopBtn = document.createElement("div");
    openShopBtn.innerHTML = "상점";
    openShopBtn.className = "menuElem";
    openShopBtn.onclick = showView;
    openShopBtn.id = "openShopBtn";

    // 중앙
    let menuCenter = document.createElement("div");
    menuCenter.id = "menuCenter";

    // 게시판
    let openBoardBtn = document.createElement("div");
    openBoardBtn.innerHTML = "게시판";
    openBoardBtn.className = "menuElem";
    openBoardBtn.onclick = ploggingBoard;
    openBoardBtn.id = "openBoardBtn";

    // 패널 닫기
    let hideMenuBtn = document.createElement("div");
    hideMenuBtn.onclick = visibleControllMenu;
    hideMenuBtn.id = "hideMenuBtn";

    // 미니게임 
    let openMiniGames = document.createElement("div");
    openMiniGames.onclick = miniGame;
    openMiniGames.innerHTML = "미니<br>게임";
    openMiniGames.className = "menuElem";
    openMiniGames.id = "openMiniGames";

    // 설정
    let openSetting = document.createElement("div");
    openSetting.onclick = setting;
    openSetting.innerHTML = "설정";
    openSetting.className = "menuElem";
    openSetting.id = "openSetting";

    // 패널 열기
    let visibleMenuBtn = document.createElement("div");
    visibleMenuBtn.style.display = "none";
    visibleMenuBtn.onclick = visibleControllMenu;
    visibleMenuBtn.id = "visibleMenuBtn";
    
    // 패널 열기 이미지
    let visibleMenuIco = document.createElement("div");
    visibleMenuIco.id = "visibleMenuIco";

    menuCenter.appendChild(CASCADING_MENU(openBoardBtn));
    menuCenter.appendChild(hideMenuBtn);
    menuBox.appendChild(CASCADING_MENU(openMailBoxBtn));
    menuBox.appendChild(CASCADING_MENU(openShopBtn));
    menuBox.appendChild(menuCenter);
    menuBox.appendChild(CASCADING_MENU(openMiniGames));
    menuBox.appendChild(CASCADING_MENU(openSetting));
    menu.appendChild(menuBackground);
    menu.appendChild(menuBox);

    visibleMenuBtn.appendChild(visibleMenuIco);

    BACKGROUND.appendChild(menu);
    BACKGROUND.appendChild(visibleMenuBtn);

    // let menu = document.createElement('div');
    // menu.style.display = "none";
    // menu.id = "menu";

    // for (let i = 0; i < MENU_COUNT; i++) {
    //     let div = document.createElement('div');
    //     div.onclick = MENU_FX[i];
    //     div.id = "menu_" + i;
    //     div.className = "menuElem";
    //     menu.appendChild(div);
    // }

    // BACKGROUND.appendChild(menu);
    // BACKGROUND.appendChild(menuBackground);

    console.log("loaded buttons from main window");
}

// 메뉴바 화면 토글
function visibleControllMenu() {
    let menu = document.getElementById("menu");
    let visibleMenuBtn = document.getElementById("visibleMenuBtn");

    if (menu.style.display !== "none") {
        menu.style.display = "none";
        visibleMenuBtn.style.display = "flex";
    } else {
        menu.style.display = "flex";
        visibleMenuBtn.style.display = "none";
    }
}


function miniGame() {
    actionMessage("준비중");
}

function setting() {
    actionMessage("미구현");
}

// 브라우저 크기변화 함수 (리스너 포함)
function onResize(e) {
    let rate = window.innerWidth / window.innerHeight;

    if (rate < 1) {
        if (TOGGLE === "PC") {
            renderingMobile();
            TOGGLE = "Mobile";
        }
    }
    else if (rate >= 1) {
        if (TOGGLE === "Mobile") {
            renderingPC();
            TOGGLE = "PC";
        }

        let userPost = document.getElementById('userPost');
        let mail = document.getElementById('mail');
        if (userPost.style.display === "none") {
            let gap = (window.innerHeight-(window.innerWidth*(9/16)))/2;
            mail.style.marginTop = gap + "px";
            mail.style.height = "calc(50% - " + gap + "px)";
        }
    }
}

// 화면의 가로가 세로보다 커질 경우 PC에 맞게 슬롯들 크기, 위치 재구성
function renderingPC() {
    let html = document.getElementsByTagName("html").item(0);
    let background = document.getElementById("background");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");
    let slot4 = document.getElementById("slot4");
    let grass = document.getElementsByClassName("grass");
    let menu = document.getElementById("menu");
    let hideMenuBtn = document.getElementById("hideMenuBtn");
    let visibleMenuBtn = document.getElementById("visibleMenuBtn");
    let visibleMenuIco = document.getElementById("visibleMenuIco");
    let mail = document.getElementById('mail');
    let mailBox = document.getElementById('mailBox');
    let senderProfile = document.getElementById('senderProfile');
    let senderInfo = document.getElementById('senderInfo');
    let mailSender = document.getElementById('mailSender');
    let sendDate = document.getElementById('sendDate');
    let ploggingMetaData = document.getElementById('ploggingMetaData');
    let noticeBar = document.getElementById('noticeBar');
    let noticeText = document.getElementById('noticeText');
    let speaker = document.getElementById('speaker');

    html.style.fontSize = "1rem";

    background.style.width = '100%';
    background.style.height = '';

    slot1.style.bottom = "23.5%";
    slot2.style.width = "25%";
    slot2.style.bottom = "22%";
    slot4.style.width = "10%";
    slot4.style.left = "41%";
    slot4.style.bottom = "12%";

    if (grass.item(0).style.display === 'none') {
        for (let elem of grass) {
            elem.style.display = "block";
        }
    }

    menu.style.width = "65%";
    hideMenuBtn.style.width = "30%";
    visibleMenuBtn.style.width = "25%";
    visibleMenuIco.style.width = "10%";

    mail.style.width = "50%";
    mailBox.style.width = "50%";
    senderProfile.style.width = "3.125rem";
    senderProfile.style.height = "3.125rem";
    senderInfo.style.height = "3.125rem";
    mailSender.style.fontSize = "0.75rem";
    sendDate.style.fontSize = "0.5625rem";
    
    ploggingMetaData.style.fontSize = "1.5rem";
    ploggingMetaData.style.justifyContent = "space-around";

    noticeBar.style.height = "25%";
    noticeText.style.width = "70%";
    noticeText.style.height = "calc(100% - 3.75rem)";
    noticeText.style.padding = "1.875rem";
    speaker.style.top = "";
    speaker.style.right = "";
    speaker.style.height = "";
    speaker.style.marginBottom = "";
    speaker.style.transform = "";

    console.log("changed PC mode");
}

// 화면의 가로가 세로보다 작아질 경우 모바일에 맞게 슬롯들 크기, 위치 재구성
function renderingMobile() {
    let html = document.getElementsByTagName("html").item(0);
    let background = document.getElementById("background");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");
    let slot4 = document.getElementById("slot4");
    let grass = document.getElementsByClassName("grass");
    let menu = document.getElementById("menu");
    let hideMenuBtn = document.getElementById("hideMenuBtn");
    let visibleMenuBtn = document.getElementById("visibleMenuBtn");
    let visibleMenuIco = document.getElementById("visibleMenuIco");
    let mail = document.getElementById('mail');
    let mailBox = document.getElementById('mailBox');
    let senderProfile = document.getElementById('senderProfile');
    let senderInfo = document.getElementById('senderInfo');
    let mailSender = document.getElementById('mailSender');
    let sendDate = document.getElementById('sendDate');
    let ploggingMetaData = document.getElementById('ploggingMetaData');
    let noticeBar = document.getElementById('noticeBar');
    let noticeText = document.getElementById('noticeText');
    let speaker = document.getElementById('speaker');

    html.style.fontSize = "2rem";

    background.style.width = '';
    background.style.height = '100%';

    slot1.style.bottom = "26%";
    slot2.style.width = "45%";
    slot2.style.bottom = "20%";
    slot4.style.width = "20%";
    slot4.style.left = "32.5%";
    slot4.style.bottom = "15%";

    if (grass.item(0).style.display !== 'none') {
        for (let elem of grass) {
            elem.style.display = "none";
        }
    }

    menu.style.width = "100%";
    hideMenuBtn.style.width = "20%";
    visibleMenuBtn.style.width = "60%";
    visibleMenuIco.style.width = "10%";

    mail.style.width = "100%";
    mail.style.height = "";
    mail.style.marginTop = "";
    mailBox.style.width = "100%";
    senderProfile.style.width = "1.875rem";
    senderProfile.style.height = "1.875rem";
    senderInfo.style.height = "1.875rem";
    mailSender.style.fontSize = "0.6875rem";
    sendDate.style.fontSize = "0.5rem";
    
    ploggingMetaData.style.fontSize = "";
    ploggingMetaData.style.justifyContent = "";

    noticeBar.style.height = "40%";
    noticeText.style.width = "calc(100% - 2.5rem)";
    noticeText.style.height = "calc(100% - 2.5rem)";
    noticeText.style.padding = "1.25rem";
    // noticeText.style.fontSize = "0.8125rem";
    speaker.style.top = "-40%";
    speaker.style.right = "5%";
    speaker.style.height = "30%";
    speaker.style.marginBottom = "15%";
    speaker.style.transform = "translate(5%, 40%)";

    console.log("changed Mobile mode");
}

function audioPlay() {
    window.removeEventListener('click', audioPlay);
    let bgm = document.getElementById("bgm");
    bgm.play();
}

// 개발전용
function test(msg="msg") {
    SOCKET.emit('request', {'msg':'test', 'data':{'room':'testRoom'}});
    console.log('request!');
}

console.log('loaded game.js');