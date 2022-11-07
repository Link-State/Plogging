const MENU_COUNT = 5;
const MENU_FX = [ploggingBoard, null, null, null, null];
let TOGGLE = window.innerWidth / window.innerHeight > 1 ? "Mobile" : "PC";

// 메인 요소 생성
function loadMain() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 배경
    let background = document.createElement('div');
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

    background.appendChild(slot4);
    background.appendChild(slot3);
    background.appendChild(slot2);
    background.appendChild(slot1);
    BODY.appendChild(background);

    loadButton();
    loadBoard();
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

    let menu = document.createElement('div');
    menu.style.display = "none";
    menu.id = "menu";

    for (let i = 0; i < MENU_COUNT; i++) {
        let div = document.createElement('div');
        div.onclick = MENU_FX[i];
        div.id = "menu:" + i;
        div.className = "menuElem";
        menu.appendChild(div);
    }

    BACKGROUND.appendChild(menu);
    BACKGROUND.appendChild(menuBtn);

    onResize(false);
    window.addEventListener("resize", onResize);
}

// 게시판 요소 생성
function loadBoard() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 플로깅 모집 게시판
    let board = document.createElement('div');
    board.style.display = "none";
    board.id = "board";

    // 뒤로가기
    let back = document.createElement('div');
    back.innerHTML = "X";
    back.id = "back";

    // 위치
    let locationMenu = document.createElement('div');
    locationMenu.id = "locationMenu";

    // 자동 위치
    let auto = document.createElement('div');
    auto.id = "auto";

    // 수동 위치
    let manual = document.createElement('div');
    manual.id = "manual";

    // 광역시/도
    let state = document.createElement('select');
    state.id = "state";

    // 시/군
    let country = document.createElement('select');
    country.id = "country";

    // 게시판
    let boardBody = document.createElement('div');
    boardBody.id = "boardBody";

    // 총 게시글 수
    let totalCount = document.createElement('div');
    totalCount.id = "totalCount";

    // 모집글 작성
    let write = document.createElement('div');
    write.id = "write";

    // 게시글 목록
    let boardList = document.createElement('div');
    boardList.id = "boardList";

    // 페이징
    let paging = document.createElement('div');
    paging.id = "paging";

    boardBody.appendChild(totalCount);
    boardBody.appendChild(write);
    boardBody.appendChild(boardList);
    boardBody.appendChild(paging);
    manual.appendChild(state);
    manual.appendChild(country);
    locationMenu.appendChild(auto);
    locationMenu.appendChild(manual);
    board.appendChild(back);
    board.appendChild(locationMenu);
    board.appendChild(boardBody);
    BODY.appendChild(board);
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

// 게시판 버튼
function ploggingBoard() {
    let background = document.getElementById("background");
    let board = document.getElementById("board");

    if (background.style.display !== "none") {
        background.style.display = "none";
        board.style.display = "block";
    }
    else {
        background.style.display = "block";
        board.style.display = "none";
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
    let menuBtn = document.getElementById("menuBtn");
    let menu = document.getElementById('menu');

    background.style.width = '100%';
    background.style.height = '';

    slot1.style.bottom = "25%";
    slot2.style.width = "15%";
    slot2.style.bottom = "20%";
    slot4.style.width = "10%";
    slot4.style.left = "35%";
    slot4.style.bottom = "15%";

    menuBtn.style.width = "5%";
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

    console.log("PC 모드");
}

// 화면의 가로가 세로보다 작아질 경우 모바일에 맞게 슬롯들 크기, 위치 재구성
function renderingMobile() {
    let background = document.getElementById("background");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");
    let slot4 = document.getElementById("slot4");
    let menuBtn = document.getElementById("menuBtn");
    let menu = document.getElementById('menu');

    background.style.width = '';
    background.style.height = '100%';

    slot1.style.bottom = "30%";
    slot2.style.width = "20%";
    slot2.style.bottom = "28.5%";
    slot4.style.width = "15%";
    slot4.style.left = "32.5%";
    slot4.style.bottom = "26.5%";

    menuBtn.style.width = "10%";
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

    console.log("모바일 모드");
}

// 개발전용
function test() {
    const BODY = document.getElementsByTagName('body').item(0);
}