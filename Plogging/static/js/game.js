let USERID = '';
let CURRENTPLOGGING = '';
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
    let bgm = document.createElement('audio');
    bgm.src = PATH + "/static/sound/bgm.mp3";
    bgm.controls = true;
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.id = "bgm";

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

    let menuBtn = document.createElement('div');
    menuBtn.onclick = onClickMenu;
    menuBtn.id = "menuBtn";

    let menuIco = document.createElement('i');
    menuIco.className = "fa-solid fa-bars";
    menuIco.id = "menuIco";

    let menu = document.createElement('div');
    menu.style.display = "none";
    menu.id = "menu";

    for (let i = 0; i < MENU_COUNT; i++) {
        let div = document.createElement('div');
        div.onclick = MENU_FX[i];
        div.id = "menu_" + i;
        div.className = "menuElem";
        menu.appendChild(div);
    }

    menuBtn.appendChild(menuIco);
    BACKGROUND.appendChild(menu);
    BACKGROUND.appendChild(menuBtn);
}

// 메뉴 버튼
function onClickMenu() {
    let menu = document.getElementById("menu");

    if (menu.style.display !== "none") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}

// 브라우저 크기변화 함수 (리스너 포함)
function onResize(e) {
    let rate = window.innerWidth / window.innerHeight;

    if (rate < 1 && TOGGLE === "PC") {
        renderingMobile();
        TOGGLE = "Mobile";
    }
    else if (rate >= 1 && TOGGLE === "Mobile") {
        renderingPC();
        TOGGLE = "PC";
    }
}

// 화면의 가로가 세로보다 커질 경우 PC에 맞게 슬롯들 크기, 위치 재구성
function renderingPC() {
    let background = document.getElementById("background");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");
    let slot4 = document.getElementById("slot4");
    let grass = document.getElementsByClassName("grass");
    let menuBtn = document.getElementById("menuBtn");
    let menu = document.getElementById('menu');
    let mailBox = document.getElementById('mailBox');
    let senderProfile = document.getElementById('senderProfile');
    let senderInfo = document.getElementById('senderInfo');
    let mailSender = document.getElementById('mailSender');
    let sendDate = document.getElementById('sendDate');

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

    // menuBtn.style.width = "5%";
    menuBtn.style.top = "1%";
    menuBtn.style.right = "1%";
    menuBtn.style.bottom = "";

    menu.style.width = "7%";
    menu.style.height = "";
    menu.style.aspectRatio = "1 / " + MENU_COUNT;
    menu.style.top = "10%";
    menu.style.right = "1%";
    menu.style.bottom = "";

    for (let elem of document.getElementsByClassName("menuElem")) {
        elem.style.width = "";
        elem.style.height = (100 / MENU_COUNT) + "%";
    }

    mailBox.style.width = "50%";
    senderProfile.style.width = "50px";
    senderProfile.style.height = "50px";
    senderInfo.style.height = "50px";
    mailSender.style.fontSize = "12pt";
    sendDate.style.fontSize = "9pt";

    console.log("PC 모드");
}

// 화면의 가로가 세로보다 작아질 경우 모바일에 맞게 슬롯들 크기, 위치 재구성
function renderingMobile() {
    let background = document.getElementById("background");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");
    let slot4 = document.getElementById("slot4");
    let grass = document.getElementsByClassName("grass");
    let menuBtn = document.getElementById("menuBtn");
    let menu = document.getElementById('menu');
    let mailBox = document.getElementById('mailBox');
    let senderProfile = document.getElementById('senderProfile');
    let senderInfo = document.getElementById('senderInfo');
    let mailSender = document.getElementById('mailSender');
    let sendDate = document.getElementById('sendDate');

    background.style.width = '';
    background.style.height = '100%';

    slot1.style.bottom = "26%";
    slot2.style.width = "45%";
    slot2.style.bottom = "20%";
    slot4.style.width = "15%";
    slot4.style.left = "32.5%";
    slot4.style.bottom = "15%";

    if (grass.item(0).style.display !== 'none') {
        for (let elem of grass) {
            elem.style.display = "none";
        }
    }

    // menuBtn.style.width = "10%";
    menuBtn.style.top = "";
    menuBtn.style.right = "2%";
    menuBtn.style.bottom = "2%";

    menu.style.width = "";
    menu.style.height = "7%";
    menu.style.aspectRatio = MENU_COUNT + " / 1";
    menu.style.top = "";
    menu.style.right = "13%";
    menu.style.bottom = "2%";

    for (let elem of document.getElementsByClassName("menuElem")) {
        elem.style.width = (100 / MENU_COUNT) + "%";
        elem.style.height = "";
    }

    mailBox.style.width = "100%";
    senderProfile.style.width = "30px";
    senderProfile.style.height = "30px";
    senderInfo.style.height = "30px";
    mailSender.style.fontSize = "11pt";
    sendDate.style.fontSize = "8pt";

    console.log("모바일 모드");
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