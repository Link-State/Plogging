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

// 구분선 생성 함수
const CREATE_LINE = () => {
  let line = document.createElement("hr");
  line.className = "line";
  return line;
};

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
  search.id = "search";

  // 결과 수
  let searchResult = document.createElement("span");
  searchResult.id = "searchResult";
  searchResult.innerHTML = "0";

  // 메뉴
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

  // 모집글 작성
  let write = document.createElement("div");
  write.onclick = writePost;
  write.innerHTML = "모집글 작성";
  write.id = "write";

  // 게시글 목록
  let boardList = document.createElement("div");
  boardList.id = "boardList";

  search.appendChild(searchResult);
  boardBody.appendChild(boardList);
  locationMenu.appendChild(state);
  locationMenu.appendChild(country);
  locationMenu.appendChild(zone);
  locationMenu.appendChild(search);
  postMenu.appendChild(myPost);
  postMenu.appendChild(joiningPlogging);
  postMenu.appendChild(write);
  board.appendChild(back);
  board.appendChild(locationMenu);
  board.appendChild(postMenu);
  board.appendChild(boardBody);
  BODY.appendChild(board);
  console.log("loaded board");
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

  // 게시 버튼
  let upload = document.createElement("div");
  upload.onclick = uploadPost;
  upload.innerHTML = "게시";
  upload.id = "upload";

  // 제목
  let title = document.createElement("input");
  title.placeholder = "글 제목";
  title.type = "text";
  title.id = "title";

  // 위치
  let locationGroup = document.createElement("div");
  locationGroup.id = "locationGroup";

  // 위치 텍스트
  let locationText = document.createElement("div");
  locationText.id = "locationText";
  locationText.innerHTML = "위치";

  // 위치 입력 폼
  let locationInputs = document.createElement("div");
  locationInputs.id = "locationInputs";

  let selectInputs = document.createElement("div");
  selectInputs.id = "selectInputs";

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

  // 시작 일시 그룹
  let dateGroup = document.createElement("div");
  dateGroup.id = "dateGroup";

  // 시작 일시 텍스트
  let dateText = document.createElement("div");
  dateText.id = "dateText";
  dateText.innerHTML = "진행일";

  // 시작 일시
  let setDate = document.createElement("input");
  setDate.placeholder = "날짜 및 시간 선택";
  setDate.type = "datetime-local";
  setDate.id = "setDate";

  // 인원 그룹
  let memberGroup = document.createElement("div");
  memberGroup.id = "memberGroup";

  // 인원 텍스트
  let memberText = document.createElement("div");
  memberText.id = "memberText";
  memberText.innerHTML = "모집 인원";

  // 인원
  let setMember = document.createElement("input");
  setMember.placeholder = "숫자만 입력 ex) 9";
  setMember.type = "text";
  setMember.id = "setMember";

  // 내용
  let context = document.createElement("textarea");
  context.placeholder =
    "1. 욕설/비방/광고 등 목적에 맞지 않는 글은 임의로 삭제될 수 있습니다." +
    "\n2. 신고 누적횟수에 따라 이용에 제한이 있을 수 있습니다." +
    "\n3. 모집글은 1명 당 동시에 최대 1개만 게시할 수 있습니다." +
    "\n4. 플로깅 참가 신청 후 노쇼할 경우, 불이익이 있을 수 있습니다.";
  context.id = "context";

  // 구분선
  let CREATE_LINE = () => {
    let line = document.createElement("hr");
    line.className = "line";
    return line;
  };

  selectInputs.appendChild(setState);
  selectInputs.appendChild(setCountry);
  selectInputs.appendChild(setZone);
  locationInputs.appendChild(selectInputs);
  locationInputs.appendChild(setDetailSection);
  locationGroup.appendChild(locationText);
  locationGroup.appendChild(locationInputs);
  dateGroup.appendChild(dateText);
  dateGroup.appendChild(setDate);
  memberGroup.appendChild(memberText);
  memberGroup.appendChild(setMember);
  postHeader.appendChild(upload);
  postHeader.appendChild(title);
  postHeader.appendChild(CREATE_LINE());
  postHeader.appendChild(locationGroup);
  postHeader.appendChild(CREATE_LINE());
  postHeader.appendChild(dateGroup);
  postHeader.appendChild(CREATE_LINE());
  postHeader.appendChild(memberGroup);
  postHeader.appendChild(CREATE_LINE());
  postSection.appendChild(postHeader);
  postSection.appendChild(context);
  post.appendChild(back);
  post.appendChild(postSection);

  BOARD.appendChild(post);
  console.log("loaded write post form");
}

// 게시글 읽기 요소 생성
function loadUserPost() {
  const BOARD = document.getElementById("board");

  // 배경
  let userPost = document.createElement("div");
  userPost.id = "userPost";
  userPost.style.display = "none";

  // 게시글 전체
  let postContext = document.createElement("div");
  postContext.id = "postContext";

  // 닫기
  let back = document.createElement("div");
  back.className = "back";
  back.id = "userPostBack";
  back.innerHTML = "X";
  back.onclick = detailPost;

  // 글 관련 정보
  let postInfo = document.createElement("div");
  postInfo.id = "postInfo";

  // 프로필 사진
  let postProfile = document.createElement("div");
  postProfile.id = "postProfile";

  // 작성자 + 작성 일자
  let postMeta = document.createElement("div");
  postMeta.id = "postMeta";

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

  let ploggingLocation_where = document.createElement("div");
  ploggingLocation_where.innerHTML = "어디서?";
  ploggingLocation_where.id = "ploggingLocation_where";

  let ploggingLocation_loc = document.createElement("div");
  ploggingLocation_loc.id = "ploggingLocation_loc";

  // 시작 일자
  let ploggingStartDate = document.createElement("div");
  ploggingStartDate.id = "ploggingStartDate";

  let ploggingStartDate_when = document.createElement("div");
  ploggingStartDate_when.innerHTML = "언제?";
  ploggingStartDate_when.id = "ploggingStartDate_when";

  let ploggingStartDate_date = document.createElement("div");
  ploggingStartDate_date.id = "ploggingStartDate_date";

  // 게시글 메인 정보
  let userPostMain = document.createElement("div");
  userPostMain.id = "userPostMain";

  // 제목
  let userPostTitle = document.createElement("div");
  userPostTitle.id = "userPostTitle";

  // 인원 현황
  let currentMembers = document.createElement("div");
  currentMembers.id = "currentMembers";

  // 인원 현황 아이콘
  let currentMemberIco = document.createElement("i");
  currentMemberIco.className = "fa-solid fa-person";
  currentMemberIco.id = "currentMemberIco";

  let currentMemberAmount = document.createElement("span");
  currentMemberAmount.id = "currentMemberAmount";

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

  postMeta.appendChild(postWritter);
  postMeta.appendChild(postUploadDate);
  postInfo.appendChild(postProfile);
  postInfo.appendChild(postMeta);
  userPostMain.appendChild(userPostTitle);
  currentMembers.appendChild(currentMemberIco);
  currentMembers.appendChild(currentMemberAmount);
  userPostMain.appendChild(currentMembers);
  ploggingStartDate.appendChild(ploggingStartDate_when);
  ploggingStartDate.appendChild(ploggingStartDate_date);
  ploggingInfo.appendChild(ploggingStartDate);
  ploggingLocation.appendChild(ploggingLocation_where);
  ploggingLocation.appendChild(ploggingLocation_loc);
  ploggingInfo.appendChild(ploggingLocation);
  postContext.appendChild(ploggingDelete);
  postContext.appendChild(ploggingReport);
  postContext.appendChild(postInfo);
  postContext.appendChild(userPostMain);
  postContext.appendChild(CREATE_LINE());
  postContext.appendChild(ploggingInfo);
  postContext.appendChild(CREATE_LINE());
  postContext.appendChild(userPostContext);
  postContext.appendChild(ploggingJoin);
  postContext.appendChild(ploggingLeft);
  userPost.appendChild(back);
  userPost.appendChild(postContext);

  BOARD.appendChild(userPost);
  console.log("loaded read board form");
}

// 게시판 폼 토글
function ploggingBoard() {
  let background = document.getElementById("background");
  let board = document.getElementById("board");

  if (background.style.display !== "none") {
    background.style.display = "none";
    board.style.display = "flex";
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
  let boardList = document.getElementById("boardList");
  let searchResult = document.getElementById("searchResult");
  let count = 0;

  const KEYS = Object.keys(data);
  const CREATE_POST = (key) => {
    let year = data[key]["date"]["y"];
    let month = data[key]["date"]["M"];
    let day = data[key]["date"]["d"];
    let hour = data[key]["date"]["h"];
    let minute = data[key]["date"]["m"];
    let date = new Date(year, month - 1, day, hour, minute).getTime();

    if (Date.now() + 3600000 < date) {
      date =
        month +
        "월 " +
        day +
        "일 (" +
        data[key]["date"]["w"][0] +
        ") " +
        hour +
        "시 " +
        minute +
        "분";

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
      postPreviewDate.innerHTML = date;
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
    } else if (Date.now() - date >= 14400000) {
      SOCKET.emit("request", { msg: "overTimePlogging", data: key });
    }
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

  searchResult.innerHTML = count;
}

// 내 게시글 삭제
function deletePost(e) {
  let answer = requestMessage("게시글을 삭제하시겠습니까?");
  if (answer) {
    SOCKET.emit("request", { msg: "deleteBoard" });
  }
}

// 플로깅 참가
function joinPlogging(e) {
  if ("geolocation" in navigator) {
    let startDateObj = BOARD_LIST[e.target.value]["date"];
    let year = startDateObj["y"];
    let month = startDateObj["M"];
    let day = startDateObj["d"];
    let hour = startDateObj["h"];
    let min = startDateObj["m"];
    let startTime = new Date(year, month - 1, day, hour, min).getTime();
    let answer;
    if (Date.now() + 3600000 >= startTime) {
      answer = requestMessage("해당 플로깅은 참가 후, 취소할 수 없습니다.\n『참가...』 하시겠습니까?");
    }
    else {
      answer = requestMessage("해당 플로깅에 참가하시겠습니까?");
    }
    if (answer) {
      SOCKET.emit("request", { msg: "joinPlogging", data: e.target.value });
    }
  } else {
    actionMessage(
      "현재 브라우저로 플로깅에 참여할 수 없습니다. 다른 브라우저로 다시 시도해주세요."
    );
  }
}

// 플로깅 참가 철회
function leftPlogging(e) {
  let answer = requestMessage("플로깅 참가를 취소하시겠습니까?");
  if (answer) {
    SOCKET.emit("request", { msg: "leftPlogging", data: e.target.value });
  }
}

// 플로깅 신고 (미구현)
function reportPost(e) {
  let answer = requestMessage("이 플로깅을 신고하시겠습니까?");
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
    let mail = document.getElementById("mail");
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
      let ploggingStartDate_date = document.getElementById("ploggingStartDate_date");
      let ploggingLocation_loc = document.getElementById("ploggingLocation_loc");
      let currentMemberAmount = document.getElementById("currentMemberAmount");
      let userPostContext = document.getElementById("userPostContext");
      let ploggingDelete = document.getElementById("ploggingDelete");
      let ploggingJoin = document.getElementById("ploggingJoin");
      let ploggingLeft = document.getElementById("ploggingLeft");
      let ploggingReport = document.getElementById("ploggingReport");
      let recordedDate = new Date(userPostInfo["uploadDate"]);

      userPostTitle.innerHTML = userPostInfo["postTitle"];
      postWritter.innerHTML = userPostInfo["host"];
      postWritter.value = userPostInfo["host"];
      postUploadDate.innerHTML =
        recordedDate.getFullYear() +
        "년 " +
        (recordedDate.getMonth() + 1) +
        "월 " +
        recordedDate.getDate() +
        "일 " +
        recordedDate.getHours() +
        "시 " +
        recordedDate.getMinutes() +
        "분 " +
        recordedDate.getSeconds() +
        "초 ";
        ploggingLocation_loc.innerHTML =
        "" +
        userPostInfo["state"] +
        " " +
        userPostInfo["country"] +
        " " +
        userPostInfo["zone"] +
        " " +
        userPostInfo["section"];
        ploggingStartDate_date.innerHTML = "" + startDate;
      currentMemberAmount.innerHTML =
        userPostInfo["memberList"].length + " / " + userPostInfo["maxMember"];
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

      mail.style.marginTop = "";
      mail.style.height = "";
      userPost.style.display = "block";

    } else {
      actionMessage("작성 한 게시글이 없습니다.");
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
  let answer = requestMessage("게시글을 올리시겠습니까?");
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
      actionMessage("[상세 위치]를 입력해주세요.");
    } else if (isNaN(member)) {
      actionMessage("멤버 모집 수는 '숫자'만 기재해주세요.");
    } else if (member < 2) {
      actionMessage("멤버 모집은 2명부터 가능합니다.");
    } else if (startDate === "") {
      actionMessage("플로깅 시작 날짜를 입력해주세요.");
    } else if (Date.parse(startDate) <= Date.now() + 3600000) {
      actionMessage("플로깅 시작 날짜는 1시간 이후부터 설정 가능합니다.");
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
