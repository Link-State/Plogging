const STATES = ['전체', '서울', '인천', '대전', '부산', '울산', '광주', '대구', '세종', '제주', '경기', '강원', '충북', '충남', '경북', '경남', '전북', '전남'];
const COUNTRY = {
    '서울':['전체', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
    '인천':['전체', '중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '대전':['전체', '동구', '중구', '서구', '유성구', '대덕구'],
    '부산':['전체', '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    '울산':['전체', '중구', '남구', '동구', '북구', '울주군'],
    '광주':['전체', '동구', '서구', '남구', '북구', '광산구'],
    '대구':['전체', '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '세종':[],
    '제주':['전체', '서귀포', '제주'],
    '경기':['전체', '고양', '수원', '용인', '과천', '광명', '광주', '구리', '군포', '김포', '남양주', '동두천', '부천', '성남', '시흥', '안산', '안성', '안양', '양주', '여주', '오산', '의왕', '의정부', '이천', '파주', '평택', '포천', '하남', '화성', '가평', '양평', '연천'],
    '강원':['전체', '강릉', '동해', '삼척', '속초', '원주', '춘천', '태백', '고성', '양구', '양양', '영월', '인제', '정선', '철원', '평창', '홍천', '화천', '횡성'],
    '충북':['전체', '제천', '청주', '충주', '괴산', '단양', '보은', '영동', '옥천', '음성', '증평', '진천'],
    '충남':['전체', '계룡', '공주', '논산', '당진', '보령', '서산', '아산', '천안', '금산', '부여', '서천', '예산', '청양', '태안', '홍성'],
    '경북':['전체', '경산', '경주', '구미', '김천', '문경', '상주', '안동', '영주', '영천', '포항', '고령', '군위', '봉화', '성주', '영덕', '영양', '예천', '울릉', '울진', '의성', '청도', '청송', '칠곡'],
    '경남':['전체', '창원', '거제', '김해', '밀양', '사천', '양산', '진주', '통영', '거창', '고성', '남해', '산청', '의령', '창녕', '하동', '함안', '함양', '합천'],
    '전북':['전체', '군산', '김제', '남원', '익산', '전주', '정읍', '고창', '무주', '부안', '순창', '완주', '임실', '장수', '진안'],
    '전남':['전체', '광양', '나주', '목포', '순천', '여수', '강진', '고흥', '곡성', '구례', '담양', '무안', '보성', '신안', '영광', '영암', '완도', '장성', '장흥', '진도', '함평', '해남', '화순']
};
const ZONE = {
    '고양':['전체', '덕양구', '일산동구', '일산서구'],
    '수원':['전체', '장안구', '권선구', '팔달구', '영통구'],
    '용인':['전체', '처인구', '기흥구', '수지구'],
    '성남':['전체', '수정구', '중원구', '분당구'],
    '안산':['전체', '상록구', '단원구'],
    '안양':['전체', '동안구', '만안구'],
    '청주':['전체', '상당구', '서원구', '흥덕구', '청원구'],
    '천안':['전체', '동남구', '서북구'],
    '전주':['전체', '완산구', '덕진구'],
    '포항':['전체', '남구', '북구'],
    '창원':['전체', '의창구', '성산구', '마산합포구', '마산회원구', '진해구']
};
const MAX_MEMBER = 10;
let BOARD_LIST = {};

// 게시판 요소 생성
function loadBoard() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 플로깅 모집 게시판
    let board = document.createElement('div');
    board.style.display = "none";
    board.id = "board";

    // 뒤로가기
    let back = document.createElement('div');
    back.onclick = ploggingBoard;
    back.innerHTML = "X";
    back.id = "back";
    back.className = "back";

    // 위치
    let locationMenu = document.createElement('div');
    locationMenu.id = "locationMenu";

    // 광역시/도
    let state = document.createElement('select');
    state.onchange = selectState;
    state.name = "state";
    state.id = "state";
    for (let s of STATES) {
        let option = document.createElement('option');
        option.value = s;
        option.innerHTML = s;
        state.appendChild(option);
    }

    // 시/군
    let country = document.createElement('select');
    country.onchange = selectCountry;
    country.name = "country";
    country.id = "country";

    // 구
    let zone = document.createElement('select');
    zone.name = "zone";
    zone.id = "zone";

    // 지역 검색
    let search = document.createElement('div');
    search.onclick = searchPost;
    search.innerHTML = "검색";
    search.id = "search";

    // 게시판
    let boardBody = document.createElement('div');
    boardBody.id = "boardBody";

    // 게시판 리본
    let boardRibon = document.createElement('div');
    boardRibon.id = "boardRibon";

    // 총 게시글 수
    let totalCount = document.createElement('div');
    totalCount.innerHTML = "총 N건";
    totalCount.id = "totalCount";

    // 모집글 작성
    let write = document.createElement('div');
    write.onclick = writePost;
    write.innerHTML = "모집글 작성";
    write.id = "write";

    // 게시글 목록
    let boardList = document.createElement('div');
    boardList.id = "boardList";

    // 페이징
    let paging = document.createElement('div');
    paging.id = "paging";

    boardRibon.appendChild(totalCount);
    boardRibon.appendChild(write);
    boardBody.appendChild(boardRibon);
    boardBody.appendChild(boardList);
    locationMenu.appendChild(state);
    locationMenu.appendChild(country);
    locationMenu.appendChild(zone);
    locationMenu.appendChild(search);
    board.appendChild(back);
    board.appendChild(locationMenu);
    board.appendChild(boardBody);
    board.appendChild(paging);
    BODY.appendChild(board);
}

// 시/도 선택
function selectState(e) {
    let country;
    let zone;

    if (e.target.id === "state") {
        country = document.getElementById('country');
        zone = document.getElementById('zone');
    }
    else if (e.target.id === "setState") {
        country = document.getElementById('setCountry');
        zone = document.getElementById('setZone');
    }
    
    while (country.hasChildNodes()) {
        country.firstChild.remove();
    }

    while (zone.hasChildNodes()) {
        zone.firstChild.remove();
    }

    if (e.target.value !== "전체") {
        for (let c of COUNTRY[e.target.value]) {
            let option = document.createElement('option');
            option.value = c;
            option.innerHTML = c;
            country.appendChild(option);
        }
    }
}

// 시/구 선택
function selectCountry(e) {
    let zone;
    
    if (e.target.id === "country") {
        zone = document.getElementById('zone');
    }
    else if (e.target.id === "setCountry") {
        zone = document.getElementById('setZone');
    }

    while (zone.hasChildNodes()) {
        zone.firstChild.remove();
    }

    if (e.target.value !== "전체" && ZONE[e.target.value] !== undefined) {
        for (let z of ZONE[e.target.value]) {
            let option = document.createElement('option');
            option.value = z;
            option.innerHTML = z;
            zone.appendChild(option);
        }
    }
}

// 게시글 작성 요소 생성
function loadPost() {
    const BOARD = document.getElementById('board');

    // 배경
    let post = document.createElement('div');
    post.style.display = "none";
    post.id = "post";

    // 닫기버튼
    let back = document.createElement('div');
    back.innerHTML = "X";
    back.onclick = writePost;
    back.className = "back";

    // 바디
    let postSection = document.createElement('div');
    postSection.id = "postSection";

    // 헤더
    let postHeader = document.createElement('div');
    postHeader.id = "postHeader";

    // 위치
    let setLocation = document.createElement('div');
    setLocation.id = "setLocation";

    // 광역시/도
    let setState = document.createElement('select');
    setState.id = "setState";
    setState.onchange = selectState;
    for (let s of STATES) {
        let option = document.createElement('option');
        option.value = s;
        option.innerHTML = s;
        setState.appendChild(option);
    }

    // 시/군
    let setCountry = document.createElement('select');
    setCountry.id = "setCountry";
    setCountry.onchange = selectCountry;

    // 구
    let setZone = document.createElement('select');
    setZone.id = "setZone";

    // 인원
    let setMember = document.createElement('select');
    setMember.id = "setMember";
    for (let i = 0; i < MAX_MEMBER; i++) {
        let option = document.createElement('option');
        option.value = i+1;
        option.innerHTML = i+1;
        setMember.appendChild(option);
    }

    // 시작 일시
    let setDate = document.createElement('input');
    setDate.type = "datetime-local";
    setDate.id = "setDate";

    // 제목
    let title = document.createElement('input');
    title.type = "text";
    title.id = "title";

    // 내용
    let context = document.createElement('textarea');
    context.id = "context";

    // 게시 버튼
    let upload = document.createElement('div');
    upload.onclick = uploadPost;
    upload.innerHTML = "게시";
    upload.id = "upload";

    setLocation.appendChild(setState);
    setLocation.appendChild(setCountry);
    setLocation.appendChild(setZone);
    postHeader.appendChild(setLocation);
    postHeader.appendChild(setMember);
    postHeader.appendChild(setDate);
    postHeader.appendChild(title);
    postSection.appendChild(postHeader);
    postSection.appendChild(context);
    postSection.appendChild(upload);
    post.appendChild(back);
    post.appendChild(postSection);

    BOARD.appendChild(post);
}

// 게시글 읽기 요소 생성
function loadUserPost() {
    const BOARD = document.getElementById('board');

    // 배경
    let userPost = document.createElement('div');
    userPost.id = "userPost";
    userPost.style.display = "none";

    // 닫기
    let back = document.createElement('div');
    back.className = "back";
    back.id = "userPostBack";
    back.innerHTML = "X";
    back.onclick = detailPost;

    // 제목
    let userPostTitle = document.createElement('div');
    userPostTitle.id = "userPostTitle";

    // 글 관련 정보
    let postInfo = document.createElement('div');
    postInfo.id = "postInfo";

    // 작성자
    let postWritter = document.createElement('div');
    postWritter.id = "postWritter";

    // 작성 일자
    let postUploadDate = document.createElement('div');
    postUploadDate.id = "postUploadDate";

    // 플로깅 관련 정보
    let ploggingInfo = document.createElement('div');
    ploggingInfo.id = "ploggingInfo";

    // 지역
    let ploggingLocation = document.createElement('div');
    ploggingLocation.id = "ploggingLocation";

    // 시작 일자
    let ploggingStartDate = document.createElement('div');
    ploggingStartDate.id = "ploggingStartDate";

    // 인원 현황
    let currentMembers = document.createElement('div');
    currentMembers.id = "currentMembers";
    
    // 내용
    let userPostContext = document.createElement('div');
    userPostContext.id = "userPostContext";

    // 참가
    let ploggingJoin = document.createElement('div');
    ploggingJoin.onclick = Join;
    ploggingJoin.style.display = "none";
    ploggingJoin.innerHTML = "참가";
    ploggingJoin.id = "ploggingJoin";

    // 참가 취소
    let ploggingLeft = document.createElement('div');
    ploggingLeft.onclick = Left();
    ploggingLeft.style.display = "none";
    ploggingLeft.innerHTML = "참가 취소";
    ploggingLeft.id = "ploggingLeft";

    postInfo.appendChild(postWritter);
    postInfo.appendChild(postUploadDate);
    ploggingInfo.appendChild(ploggingLocation);
    ploggingInfo.appendChild(ploggingStartDate);
    ploggingInfo.appendChild(currentMembers);
    userPost.appendChild(back);
    userPost.appendChild(userPostTitle);
    userPost.appendChild(postInfo);
    userPost.appendChild(ploggingInfo);
    userPost.appendChild(userPostContext);
    userPost.appendChild(ploggingJoin);
    userPost.appendChild(ploggingLeft);

    BOARD.appendChild(userPost);
}

// 게시판 버튼
function ploggingBoard() {

    let background = document.getElementById("background");
    let board = document.getElementById("board");

    if (background.style.display !== "none") {
        background.style.display = "none";
        board.style.display = "block";
        searchPost();
    }
    else {
        background.style.display = "block";
        board.style.display = "none";
    }
}

// 게시글 업데이트
function boardUpdate(data) {
    BOARD_LIST = data;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;
    let zone = document.getElementById('zone').value;
    let totalCount = document.getElementById('totalCount');
    let boardList = document.getElementById('boardList');
    let count = 0;

    const KEYS = Object.keys(data);
    const CREATE_POST = (key) => {
        let post = document.createElement('div');
        post.onclick = detailPost;
        post.id = key;
        post.className = "user_post";
        post.innerHTML = data[key]['postTitle'];
        boardList.appendChild(post);
        count++;
    };

    for (let key of KEYS) {
        // 조건
        if (state !== "전체") {
            if (data[key]['state'] === state) {
                if (country !== "전체") {
                    if (data[key]['country'] === country) {
                        if (zone !== "전체") {
                            if (data[key]['zone'] === zone) {
                                CREATE_POST(key);
                            }
                        }
                        else {
                            CREATE_POST(key);
                        }
                    }
                }
                else {
                    CREATE_POST(key);
                }
            }
        }
        else {
            CREATE_POST(key);
        }
    }

    totalCount.innerHTML = "총 " + count + "건";
}

function Join() {

}

function Left() {

}

function detailPost(e) {
    let userPost = document.getElementById('userPost');

    if (userPost.style.display !== "none") {
        userPost.style.display = "none";
    }
    else {
        let userPostInfo = BOARD_LIST[e.target.id];
        let startDate = userPostInfo['date']['y'] + "년 " + userPostInfo['date']['M'] + "월 " + userPostInfo['date']['d'] + "일 ("
        + userPostInfo['date']['w'] + ") " + userPostInfo['date']['h'] + "시 " + userPostInfo['date']['m'] + "분";
        let userPostTitle = document.getElementById('userPostTitle');
        let postWritter = document.getElementById('postWritter');
        let postUploadDate = document.getElementById('postUploadDate');
        let ploggingLocation = document.getElementById('ploggingLocation');
        let ploggingStartDate = document.getElementById('ploggingStartDate');
        let currentMembers = document.getElementById('currentMembers');
        let userPostContext = document.getElementById('userPostContext');

        userPostTitle.innerHTML = userPostInfo['postTitle'];
        postWritter.innerHTML = "작성자 : " + userPostInfo['host'];
        postUploadDate.innerHTML = "작성일자 : " + userPostInfo['uploadDate'];
        ploggingLocation.innerHTML = "지역 : " + userPostInfo['state'] + ' ' + userPostInfo['country'] + ' ' + userPostInfo['zone'];
        ploggingStartDate.innerHTML = "시작 날짜 : " + startDate;
        currentMembers.innerHTML = "인원 현황 : " + userPostInfo['memberList'].length + " / " + userPostInfo['maxMember'] + " 명";
        userPostContext.innerHTML = userPostInfo['postContext'];

        userPost.style.display = "block";
    }
}

// 게시글 검색
function searchPost() {
    let boardList = document.getElementById('boardList');
    while (boardList.hasChildNodes()) {
        boardList.firstChild.remove();
    }
    SOCKET.emit('getBoard');
}

// 게시글 작성
function writePost() {
    let post = document.getElementById('post');

    if (post.style.display !== "none") {
        post.style.display = "none";
    }
    else {
        post.style.display = "block";
    }
}

// 게시글 업로드 요청
function uploadPost() {
    let user_state = document.getElementById('setState').value;
    let user_country = document.getElementById('setCountry');
    let user_zone = document.getElementById('setZone');
    let member = parseInt(document.getElementById('setMember').value);
    let startDate = document.getElementById('setDate').value;
    let title = document.getElementById('title').value;
    let context = document.getElementById('context').value.replaceAll('\n', "<br>");

    if (user_state === "" || user_state === "전체") {
        actionMessage("[시/도]를 선택해주세요.");
    }
    else if (user_country.hasChildNodes() && user_country.value === "전체") {
        actionMessage("[시/구]를 선택해주세요.");
    }
    else if (user_zone.hasChildNodes() && user_zone.value === "전체") {
        actionMessage("[구]를 선택해주세요.");
    }
    else if (member === NaN) {
        actionMessage("멤버 모집 수가 잘못되었습니다.");
    }
    else if (startDate === "") {
        actionMessage("플로깅 시작 날짜를 입력해주세요.");
    }
    else if (Date.parse(startDate) <= Date.now()) {
        actionMessage("플로깅 시작 날짜는 1시간 후부터 설정 가능합니다.");
    }
    else if (title === "") {
        actionMessage("제목을 입력해주세요.");
    }
    else if (context === "") {
        actionMessage("내용을 입력해주세요.");
    }
    else {
        user_country = user_country.value;
        user_zone = user_zone.value;
        let week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        let dateObj = new Date(Date.parse(startDate));
        let dateJson = {
            "y" : dateObj.getFullYear(),
            "M" : dateObj.getMonth() + 1,
            "d" : dateObj.getDate(),
            "w" : week[dateObj.getDay()],
            "h" : dateObj.getHours(),
            "m" : dateObj.getMinutes()
        };
        SOCKET.emit("writeBoard", {
            state : user_state,
            country : user_country,
            zone : user_zone,
            maxMember : member,
            date : dateJson,
            postTitle : title,
            postContext : context,
            uploadDate : Date.now()
        });
    }
}