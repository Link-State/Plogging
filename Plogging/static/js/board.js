const STATES = [
  "전체",
  "서울",
  "인천",
  "대전",
  "부산",
  "울산",
  "광주",
  "대구",
  "세종",
  "제주",
  "경기",
  "강원",
  "충북",
  "충남",
  "경북",
  "경남",
  "전북",
  "전남",
];
const COUNTRY = {
  서울: [
    "전체",
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구",
  ],
  인천: [
    "전체",
    "중구",
    "동구",
    "미추홀구",
    "연수구",
    "남동구",
    "부평구",
    "계양구",
    "서구",
    "강화군",
    "옹진군",
  ],
  대전: ["전체", "동구", "중구", "서구", "유성구", "대덕구"],
  부산: [
    "전체",
    "중구",
    "서구",
    "동구",
    "영도구",
    "부산진구",
    "동래구",
    "남구",
    "북구",
    "해운대구",
    "사하구",
    "금정구",
    "강서구",
    "연제구",
    "수영구",
    "사상구",
    "기장군",
  ],
  울산: ["전체", "중구", "남구", "동구", "북구", "울주군"],
  광주: ["전체", "동구", "서구", "남구", "북구", "광산구"],
  대구: [
    "전체",
    "중구",
    "동구",
    "서구",
    "남구",
    "북구",
    "수성구",
    "달서구",
    "달성군",
  ],
  세종: [],
  제주: ["전체", "서귀포", "제주"],
  경기: [
    "전체",
    "고양",
    "수원",
    "용인",
    "과천",
    "광명",
    "광주",
    "구리",
    "군포",
    "김포",
    "남양주",
    "동두천",
    "부천",
    "성남",
    "시흥",
    "안산",
    "안성",
    "안양",
    "양주",
    "여주",
    "오산",
    "의왕",
    "의정부",
    "이천",
    "파주",
    "평택",
    "포천",
    "하남",
    "화성",
    "가평",
    "양평",
    "연천",
  ],
  강원: [
    "전체",
    "강릉",
    "동해",
    "삼척",
    "속초",
    "원주",
    "춘천",
    "태백",
    "고성",
    "양구",
    "양양",
    "영월",
    "인제",
    "정선",
    "철원",
    "평창",
    "홍천",
    "화천",
    "횡성",
  ],
  충북: [
    "전체",
    "제천",
    "청주",
    "충주",
    "괴산",
    "단양",
    "보은",
    "영동",
    "옥천",
    "음성",
    "증평",
    "진천",
  ],
  충남: [
    "전체",
    "계룡",
    "공주",
    "논산",
    "당진",
    "보령",
    "서산",
    "아산",
    "천안",
    "금산",
    "부여",
    "서천",
    "예산",
    "청양",
    "태안",
    "홍성",
  ],
  경북: [
    "전체",
    "경산",
    "경주",
    "구미",
    "김천",
    "문경",
    "상주",
    "안동",
    "영주",
    "영천",
    "포항",
    "고령",
    "군위",
    "봉화",
    "성주",
    "영덕",
    "영양",
    "예천",
    "울릉",
    "울진",
    "의성",
    "청도",
    "청송",
    "칠곡",
  ],
  경남: [
    "전체",
    "창원",
    "거제",
    "김해",
    "밀양",
    "사천",
    "양산",
    "진주",
    "통영",
    "거창",
    "고성",
    "남해",
    "산청",
    "의령",
    "창녕",
    "하동",
    "함안",
    "함양",
    "합천",
  ],
  전북: [
    "전체",
    "군산",
    "김제",
    "남원",
    "익산",
    "전주",
    "정읍",
    "고창",
    "무주",
    "부안",
    "순창",
    "완주",
    "임실",
    "장수",
    "진안",
  ],
  전남: [
    "전체",
    "광양",
    "나주",
    "목포",
    "순천",
    "여수",
    "강진",
    "고흥",
    "곡성",
    "구례",
    "담양",
    "무안",
    "보성",
    "신안",
    "영광",
    "영암",
    "완도",
    "장성",
    "장흥",
    "진도",
    "함평",
    "해남",
    "화순",
  ],
};
const ZONE = {
  고양: ["전체", "덕양구", "일산동구", "일산서구"],
  수원: ["전체", "장안구", "권선구", "팔달구", "영통구"],
  용인: ["전체", "처인구", "기흥구", "수지구"],
  성남: ["전체", "수정구", "중원구", "분당구"],
  안산: ["전체", "상록구", "단원구"],
  안양: ["전체", "동안구", "만안구"],
  청주: ["전체", "상당구", "서원구", "흥덕구", "청원구"],
  천안: ["전체", "동남구", "서북구"],
  전주: ["전체", "완산구", "덕진구"],
  포항: ["전체", "남구", "북구"],
  창원: ["전체", "의창구", "성산구", "마산합포구", "마산회원구", "진해구"],
};
let BOARD_LIST = {};

// 게시판 요소 생성
function loadBoard() {
  const BODY = document.getElementsByTagName("body").item(0);

  // 플로깅 모집 게시판
  let board = document.createElement("div");
  board.style.display = "none";
  board.id = "board";

  // 뒤로가기
  let back = document.createElement("div");
  back.onclick = ploggingBoard;
  back.innerHTML = "X";
  back.id = "back";
  back.className = "back";

  // 위치
  let locationMenu = document.createElement("div");
  locationMenu.id = "locationMenu";

  // 광역시/도
  let state = document.createElement("select");
  state.onchange = selectState;
  state.name = "state";
  state.id = "state";
  for (let s of STATES) {
    let option = document.createElement("option");
    option.value = s;
    option.innerHTML = s;
    state.appendChild(option);
  }

  // 시/군
  let country = document.createElement("select");
  country.onchange = selectCountry;
  country.name = "country";
  country.id = "country";

  // 구
  let zone = document.createElement("select");
  zone.name = "zone";
  zone.id = "zone";

  // 지역 검색
  let search = document.createElement("div");
  search.onclick = searchPost;
  search.innerHTML = "0";
  search.id = "search";

  //
  let postMenu = document.createElement("div");
  postMenu.id = "postMenu";

  // 내 글 보기
  let myPost = document.createElement("div");
  myPost.onclick = detailPost;
  myPost.innerHTML = "내 모집글 보기";
  myPost.id = "myPost";

  // 참여중인 플로깅 보기
  let joiningPlogging = document.createElement("div");
  joiningPlogging.onclick = detailPost;
  joiningPlogging.innerHTML = "참여중인 플로깅 보기";
  joiningPlogging.id = "joiningPlogging";

  // 게시판
  let boardBody = document.createElement("div");
  boardBody.id = "boardBody";

  // 게시판 리본
  let boardRibon = document.createElement("div");
  boardRibon.id = "boardRibon";

  // 총 게시글 수
  let totalCount = document.createElement("div");
  totalCount.innerHTML = "총 N건";
  totalCount.id = "totalCount";

  // 모집글 작성
  let write = document.createElement("div");
  write.onclick = writePost;
  write.innerHTML = "모집글 작성";
  write.id = "write";

  // 게시글 목록
  let boardList = document.createElement("div");
  boardList.id = "boardList";

  // 페이징
  // 2022/11/14 페이징 없애고 스크롤로!
  let paging = document.createElement("div");
  paging.id = "paging";

  boardRibon.appendChild(write);
  boardRibon.appendChild(totalCount);
  boardBody.appendChild(boardRibon);
  boardBody.appendChild(boardList);
  locationMenu.appendChild(state);
  locationMenu.appendChild(country);
  locationMenu.appendChild(zone);
  locationMenu.appendChild(search);
  postMenu.appendChild(myPost);
  postMenu.appendChild(joiningPlogging);
  board.appendChild(back);
  board.appendChild(locationMenu);
  board.appendChild(postMenu);
  board.appendChild(boardBody);
  board.appendChild(paging);
  BODY.appendChild(board);
}

// 시/도 선택
function selectState(e) {
  let country;
  let zone;

  if (e.target.id === "state") {
    country = document.getElementById("country");
    zone = document.getElementById("zone");
  } else if (e.target.id === "setState") {
    country = document.getElementById("setCountry");
    zone = document.getElementById("setZone");
  }

  while (country.hasChildNodes()) {
    country.firstChild.remove();
  }

  while (zone.hasChildNodes()) {
    zone.firstChild.remove();
  }

  if (e.target.value !== "전체") {
    for (let c of COUNTRY[e.target.value]) {
      let option = document.createElement("option");
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
    zone = document.getElementById("zone");
  } else if (e.target.id === "setCountry") {
    zone = document.getElementById("setZone");
  }

  while (zone.hasChildNodes()) {
    zone.firstChild.remove();
  }

  if (e.target.value !== "전체" && ZONE[e.target.value] !== undefined) {
    for (let z of ZONE[e.target.value]) {
      let option = document.createElement("option");
      option.value = z;
      option.innerHTML = z;
      zone.appendChild(option);
    }
  }
}

// 게시글 작성 요소 생성
function loadPost() {
  const BOARD = document.getElementById("board");

  // 배경
  let post = document.createElement("div");
  post.style.display = "none";
  post.id = "post";

  // 닫기버튼
  let back = document.createElement("div");
  back.innerHTML = "X";
  back.onclick = writePost;
  back.className = "back";

  // 바디
  let postSection = document.createElement("div");
  postSection.id = "postSection";

  // 헤더
  let postHeader = document.createElement("div");
  postHeader.id = "postHeader";

  // 위치
  let setLocation = document.createElement("div");
  setLocation.id = "setLocation";

  // 광역시/도
  let setState = document.createElement("select");
  setState.id = "setState";
  setState.onchange = selectState;
  for (let s of STATES) {
    let option = document.createElement("option");
    option.value = s;
    option.innerHTML = s;
    setState.appendChild(option);
  }

  // 시/군
  let setCountry = document.createElement("select");
  setCountry.id = "setCountry";
  setCountry.onchange = selectCountry;

  // 구
  let setZone = document.createElement("select");
  setZone.id = "setZone";

  // 상세 위치
  let setDetailSection = document.createElement("input");
  setDetailSection.placeholder = "상세 위치(직접 입력)";
  setDetailSection.type = "text";
  setDetailSection.id = "setDetailSection";

  // 인원
  let setMember = document.createElement("input");
  setMember.type = "text";
  setMember.id = "setMember";

  // 시작 일시
  let setDate = document.createElement("input");
  setDate.type = "datetime-local";
  setDate.id = "setDate";

  // 제목
  let title = document.createElement("input");
  title.placeholder = "제목";
  title.type = "text";
  title.id = "title";

  // 내용
  let context = document.createElement("textarea");
  context.placeholder =
    "1. 욕설/비방/광고 등 목적에 맞지 않는 글은 임의로 삭제될 수 있습니다." +
    "\n2. 신고 누적횟수에 따라 이용에 제한이 있을 수 있습니다." +
    "\n3. 모집글은 1명 당 동시에 최대 1개만 게시할 수 있습니다." +
    "\n4. 플로깅 참가 신청 후 노쇼할 경우, 불이익이 있을 수 있습니다.";
  context.id = "context";

  // 게시 버튼
  let upload = document.createElement("div");
  upload.onclick = uploadPost;
  upload.innerHTML = "게시";
  upload.id = "upload";

  setLocation.appendChild(setState);
  setLocation.appendChild(setCountry);
  setLocation.appendChild(setZone);
  setLocation.appendChild(setDetailSection);
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
  const BOARD = document.getElementById("board");

  // 배경
  let userPost = document.createElement("div");
  userPost.id = "userPost";
  userPost.style.display = "none";

  // 닫기
  let back = document.createElement("div");
  back.className = "back";
  back.id = "userPostBack";
  back.innerHTML = "X";
  back.onclick = detailPost;

  // 제목
  let userPostTitle = document.createElement("div");
  userPostTitle.id = "userPostTitle";

  // 글 관련 정보
  let postInfo = document.createElement("div");
  postInfo.id = "postInfo";

  // 작성자
  let postWritter = document.createElement("div");
  postWritter.onclick = writeMail;
  postWritter.id = "postWritter";

  // 작성 일자
  let postUploadDate = document.createElement("div");
  postUploadDate.id = "postUploadDate";

  // 플로깅 관련 정보
  let ploggingInfo = document.createElement("div");
  ploggingInfo.id = "ploggingInfo";

  // 지역
  let ploggingLocation = document.createElement("div");
  ploggingLocation.id = "ploggingLocation";

  // 시작 일자
  let ploggingStartDate = document.createElement("div");
  ploggingStartDate.id = "ploggingStartDate";

  // 인원 현황
  let currentMembers = document.createElement("div");
  currentMembers.id = "currentMembers";

  // 내용
  let userPostContext = document.createElement("div");
  userPostContext.id = "userPostContext";

  // 삭제
  let ploggingDelete = document.createElement("div");
  ploggingDelete.onclick = deletePost;
  ploggingDelete.style.display = "none";
  ploggingDelete.innerHTML = "삭제";
  ploggingDelete.id = "ploggingDelete";

  // 참가
  let ploggingJoin = document.createElement("div");
  ploggingJoin.onclick = joinPlogging;
  ploggingJoin.style.display = "none";
  ploggingJoin.innerHTML = "참가";
  ploggingJoin.id = "ploggingJoin";

  // 참가 취소
  let ploggingLeft = document.createElement("div");
  ploggingLeft.onclick = leftPlogging;
  ploggingLeft.style.display = "none";
  ploggingLeft.innerHTML = "참가 취소";
  ploggingLeft.id = "ploggingLeft";

  // 신고
  let ploggingReport = document.createElement("div");
  ploggingReport.onclick = reportPost;
  ploggingReport.style.display = "none";
  ploggingReport.innerHTML = "신고";
  ploggingReport.id = "ploggingReport";

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
  userPost.appendChild(ploggingDelete);
  userPost.appendChild(ploggingJoin);
  userPost.appendChild(ploggingLeft);
  userPost.appendChild(ploggingReport);

  BOARD.appendChild(userPost);
}

// 게시판 폼 토글
function ploggingBoard() {
  let background = document.getElementById("background");
  let board = document.getElementById("board");

  if (background.style.display !== "none") {
    background.style.display = "none";
    board.style.display = "block";
    searchPost();
  } else {
    background.style.display = "block";
    board.style.display = "none";
  }
}

// 게시글 업데이트
function boardUpdate(data) {
  BOARD_LIST = data;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  let zone = document.getElementById("zone").value;
  let totalCount = document.getElementById("totalCount");
  let boardList = document.getElementById("boardList");
  let count = 0;

  const KEYS = Object.keys(data);
  const CREATE_POST = (key) => {
    // 미리보기
    let post = document.createElement("div");
    post.onclick = detailPost;
    post.value = key;
    post.className = "user_post";

    // 미리보기 제목
    let postPreviewTitle = document.createElement("div");
    postPreviewTitle.innerHTML = data[key]["postTitle"];
    postPreviewTitle.className = "postPreviewTitle";
    postPreviewTitle.value = key;

    // 미리보기 날짜
    let postPreviewDate = document.createElement("div");
    postPreviewDate.innerHTML =
      data[key]["date"]["M"] +
      "월 " +
      data[key]["date"]["d"] +
      "일 (" +
      data[key]["date"]["w"][0] +
      ") " +
      data[key]["date"]["h"] +
      "시 " +
      data[key]["date"]["m"] +
      "분";
    postPreviewDate.className = "postPreviewDate";
    postPreviewDate.value = key;

    // 미리보기 위치
    let postPreviewLocation = document.createElement("div");
    postPreviewLocation.innerHTML =
      data[key]["state"] +
      " " +
      data[key]["country"] +
      " " +
      data[key]["zone"] +
      " " +
      data[key]["section"];
    postPreviewLocation.className = "postPreviewLocation";
    postPreviewLocation.value = key;

    // 미리보기 인원 정보
    let postPreviewMemberInfo = document.createElement("div");
    postPreviewMemberInfo.className = "postPreviewMemberInfo";
    postPreviewMemberInfo.value = key;

    // 미리보기 인원 아이콘
    let postPreviewMemberIco = document.createElement("i");
    postPreviewMemberIco.className = "fa-solid fa-person";
    postPreviewMemberIco.value = key;

    // 미리보기 인원 수 현황
    let postPreviewMembers = document.createElement("div");
    postPreviewMembers.innerHTML =
      data[key]["memberList"].length + " / " + data[key]["maxMember"];
    postPreviewMembers.className = "postPreviewMembers";
    postPreviewMembers.value = key;

    postPreviewMemberInfo.appendChild(postPreviewMemberIco);
    postPreviewMemberInfo.appendChild(postPreviewMembers);
    post.appendChild(postPreviewTitle);
    post.appendChild(postPreviewDate);
    post.appendChild(postPreviewLocation);
    post.appendChild(postPreviewMemberInfo);
    boardList.appendChild(post);
    count++;
  };

  for (let key of KEYS) {
    // 검색 조건
    if (state !== "전체") {
      if (data[key]["state"] === state) {
        if (country !== "전체") {
          if (data[key]["country"] === country) {
            if (zone !== "전체") {
              if (data[key]["zone"] === zone) {
                CREATE_POST(key);
              }
            } else {
              CREATE_POST(key);
            }
          }
        } else {
          CREATE_POST(key);
        }
      }
    } else {
      CREATE_POST(key);
    }
  }

  totalCount.innerHTML = "총 " + count + "건";
}

// 내 게시글 삭제
function deletePost(e) {
  let answer = confirm("글을 삭제하시겠습니까?");
  if (answer) {
    SOCKET.emit("request", { msg: "deleteBoard" });
  }
}

// 플로깅 참가
function joinPlogging(e) {
  if ("geolocation" in navigator) {
    let answer = confirm("해당 플로깅에 참가하시겠습니까?");
    if (answer) {
      SOCKET.emit("request", { msg: "joinPlogging", data: e.target.value });
    }
  } else {
    actionMessage(
      "이 브라우저로 플로깅에 참여할 수 없습니다. 다른 브라우저로 다시 시도해주세요."
    );
  }
}

// 플로깅 참가 철회
function leftPlogging(e) {
  // 시작 1시간 전 취소는 약간의 패널티
  let answer = confirm("해당 플로깅에 참가를 취소하시겠습니까?");
  if (answer) {
    SOCKET.emit("request", { msg: "leftPlogging", data: e.target.value });
  }
}

// 플로깅 신고 (미구현)
function reportPost(e) {
  let answer = confirm("해당 플로깅을 신고하시겠습니까?");
  if (answer) {
    // 미구현
  }
}

// 게시글 자세히 보기
function detailPost(e) {
  let userPost = document.getElementById("userPost");

  if (userPost.style.display !== "none") {
    userPost.style.display = "none";
  } else {
    let clickedPost = e.target.value;
    if (e.target.id === "myPost") {
      clickedPost = USERID;
    } else if (e.target.id === "joiningPlogging") {
      if (CURRENTPLOGGING !== "") {
        clickedPost = CURRENTPLOGGING;
      } else {
        actionMessage("참가중인 플로깅이 없습니다.");
        return;
      }
    }
    let userPostInfo = BOARD_LIST[clickedPost];
    if (BOARD_LIST[clickedPost] !== undefined) {
      let startDate =
        userPostInfo["date"]["y"] +
        "년 " +
        userPostInfo["date"]["M"] +
        "월 " +
        userPostInfo["date"]["d"] +
        "일 (" +
        userPostInfo["date"]["w"] +
        ") " +
        userPostInfo["date"]["h"] +
        "시 " +
        userPostInfo["date"]["m"] +
        "분";
      let userPostTitle = document.getElementById("userPostTitle");
      let postWritter = document.getElementById("postWritter");
      let postUploadDate = document.getElementById("postUploadDate");
      let ploggingLocation = document.getElementById("ploggingLocation");
      let ploggingStartDate = document.getElementById("ploggingStartDate");
      let currentMembers = document.getElementById("currentMembers");
      let userPostContext = document.getElementById("userPostContext");
      let ploggingDelete = document.getElementById("ploggingDelete");
      let ploggingJoin = document.getElementById("ploggingJoin");
      let ploggingLeft = document.getElementById("ploggingLeft");
      let ploggingReport = document.getElementById("ploggingReport");

      userPostTitle.innerHTML = userPostInfo["postTitle"];
      postWritter.innerHTML = "작성자 : " + userPostInfo["host"];
      postWritter.value = userPostInfo["host"];
      postUploadDate.innerHTML = "작성일자 : " + userPostInfo["uploadDate"];
      ploggingLocation.innerHTML =
        "지역 : " +
        userPostInfo["state"] +
        " " +
        userPostInfo["country"] +
        " " +
        userPostInfo["zone"] +
        " " +
        userPostInfo["section"];
      ploggingStartDate.innerHTML = "시작 날짜 : " + startDate;
      currentMembers.innerHTML =
        "인원 현황 : " +
        userPostInfo["memberList"].length +
        " / " +
        userPostInfo["maxMember"] +
        " 명";
      userPostContext.innerHTML = userPostInfo["postContext"];
      ploggingJoin.value = clickedPost;
      ploggingLeft.value = clickedPost;
      ploggingReport.value = clickedPost;

      if (userPostInfo["host"] === USERID) {
        ploggingDelete.style.display = "block";
        ploggingJoin.style.display = "none";
        ploggingLeft.style.display = "none";
        ploggingReport.style.display = "none";
        // 참가했던 인원들에게 개인 메일 발송
      } else if (userPostInfo["memberList"].indexOf(USERID) >= 0) {
        ploggingDelete.style.display = "none";
        ploggingJoin.style.display = "none";
        ploggingLeft.style.display = "block";
        ploggingReport.style.display = "block";
        // 방장에게 개인 메일 발송
      } else {
        ploggingDelete.style.display = "none";
        ploggingJoin.style.display = "block";
        ploggingLeft.style.display = "none";
        ploggingReport.style.display = "block";
        // 방장에게 개인 메일 발송
      }

      userPost.style.display = "block";
    } else {
      actionMessage("작성 된 글이 없습니다.");
    }
  }
}

// 게시글 검색
function searchPost() {
  let boardList = document.getElementById("boardList");
  let searchBtn = document.getElementById("search");
  searchBtn.onclick = "";
  while (boardList.hasChildNodes()) {
    boardList.firstChild.remove();
  }
  SOCKET.emit("request", { msg: "getBoard" });
}

// 게시글 작성 폼 토글
function writePost() {
  let post = document.getElementById("post");

  if (post.style.display !== "none") {
    post.style.display = "none";
  } else {
    post.style.display = "block";
  }
}

// 게시글 업로드 요청
function uploadPost() {
  let answer = confirm("글을 게시하시겠습니까?");
  if (answer) {
    let user_state = document.getElementById("setState").value;
    let user_country = document.getElementById("setCountry");
    let user_zone = document.getElementById("setZone");
    let user_section = document.getElementById("setDetailSection").value;
    let member = parseInt(document.getElementById("setMember").value);
    let startDate = document.getElementById("setDate").value;
    let title = document.getElementById("title").value;
    let context = document
      .getElementById("context")
      .value.replaceAll("\n", "<br>");

    if (user_state === "" || user_state === "전체") {
      actionMessage("[시/도]를 선택해주세요.");
    } else if (user_country.hasChildNodes() && user_country.value === "전체") {
      actionMessage("[시/구]를 선택해주세요.");
    } else if (user_zone.hasChildNodes() && user_zone.value === "전체") {
      actionMessage("[구]를 선택해주세요.");
    } else if (user_section === "") {
      actionMessage("상세 위치를 입력해주세요.");
    } else if (isNaN(member)) {
      actionMessage("멤버 모집 수는 '숫자'만 기재해주세요.");
    } else if (member < 2) {
      actionMessage("멤버 모집은 2명 이상부터 가능합니다.");
    } else if (startDate === "") {
      actionMessage("플로깅 시작 날짜를 입력해주세요.");
    } else if (Date.parse(startDate) <= Date.now() + 3600000) {
      actionMessage("플로깅 시작 날짜는 1시간 후부터 설정 가능합니다.");
    } else if (title === "") {
      actionMessage("제목을 입력해주세요.");
    } else if (context === "") {
      actionMessage("내용을 입력해주세요.");
    } else {
      user_country = user_country.value;
      user_zone = user_zone.value;
      let week = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      let dateObj = new Date(Date.parse(startDate));
      let dateJson = {
        y: dateObj.getFullYear(),
        M: dateObj.getMonth() + 1,
        d: dateObj.getDate(),
        w: week[dateObj.getDay()],
        h: dateObj.getHours(),
        m: dateObj.getMinutes(),
      };
      SOCKET.emit("request", {
        msg: "writeBoard",
        data: {
          state: user_state,
          country: user_country,
          zone: user_zone,
          section: user_section,
          maxMember: member,
          date: dateJson,
          postTitle: title,
          postContext: context,
          uploadDate: Date.now(),
        },
      });
    }
  }
}

console.log("loaded board.js");
