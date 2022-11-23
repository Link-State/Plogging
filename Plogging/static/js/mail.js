let MAIL_BOX = [];
let CHECKED_COUNT = 0;

// 받은 메일함 요소 생성
function loadMailBox() {
  const BACKGROUND = document.getElementById("background");

  // 메일함
  let mailBox = document.createElement("div");
  mailBox.style.display = "none";
  mailBox.id = "mailBox";

  // 닫기
  let back = document.createElement("div");
  back.onclick = openMailBox;
  back.innerHTML = "X";
  back.id = "mailBoxBack";
  back.className = "back";

  // 메일함 헤더
  let mailBoxHeader = document.createElement("div");
  mailBoxHeader.id = "mailBoxHeader";

  // 메일함 개수 메뉴
  let mailBoxInfoHeader = document.createElement("div");
  mailBoxInfoHeader.id = "mailBoxInfoHeader";

  // 안읽은 메일 갯수
  let notReadMailCount = document.createElement("div");
  notReadMailCount.innerHTML = "안 읽은 메일 N개";
  notReadMailCount.id = "notReadMailCount";

  // 받은 메일 갯수
  let receiveMailCount = document.createElement("div");
  receiveMailCount.innerHTML = "총 N개";
  receiveMailCount.id = "receiveMailCount";

  // 메일 삭제 메뉴
  let mailBoxMenuHeader = document.createElement("div");
  mailBoxMenuHeader.id = "mailBoxMenuHeader";

  // 메일 삭제
  let deleteMail = document.createElement("div");
  deleteMail.onclick = deleteSelectedMail;
  deleteMail.innerHTML = "삭제";
  deleteMail.id = "deleteMail";

  // 전체삭제
  let deleteAllMail = document.createElement("input");
  deleteAllMail.onclick = selectAllMail;
  deleteAllMail.style.display = "none";
  deleteAllMail.type = "checkbox";
  deleteAllMail.id = "deleteAllMail";

  // 메일 목록
  let receiveMailList = document.createElement("div");
  receiveMailList.id = "receiveMailList";

  mailBoxInfoHeader.appendChild(notReadMailCount);
  mailBoxInfoHeader.appendChild(receiveMailCount);
  mailBoxHeader.appendChild(back);
  mailBoxHeader.appendChild(mailBoxInfoHeader);
  mailBoxMenuHeader.appendChild(deleteAllMail);
  mailBoxMenuHeader.appendChild(deleteMail);
  mailBox.appendChild(mailBoxHeader);
  mailBox.appendChild(mailBoxMenuHeader);
  mailBox.appendChild(receiveMailList);
  BACKGROUND.appendChild(mailBox);
  console.log("loaded mailbox");
}

// 받은 메일 폼 요소 생성
function loadReceiveMailForm() {
  const MAILBOX = document.getElementById("mailBox");

  // 받은 메일
  let receiveMail = document.createElement("div");
  receiveMail.style.display = "none";
  receiveMail.id = "receiveMail";

  // 닫기
  let back = document.createElement("div");
  back.onclick = openReceiveMail;
  back.innerHTML = "X";
  back.id = "receiveMailBack";
  back.className = "back";

  // 메일 헤더 (제목+버튼)
  let receiveMailHeader = document.createElement("div");
  receiveMailHeader.id = "receiveMailHeader";

  // 제목
  let receiveMailTitle = document.createElement("div");
  receiveMailTitle.id = "receiveMailTitle";

  // 신고
  let reportMail = document.createElement("div");
  reportMail.onclick = mailReport;
  reportMail.innerHTML = "신고";
  reportMail.id = "reportMail";

  // 메일 정보
  let receiveMailInfo = document.createElement("div");
  receiveMailInfo.id = "receiveMailInfo";

  // 받은메일 프로필
  let senderProfile = document.createElement("div");
  senderProfile.id = "senderProfile";

  // 보낸이 정보
  let senderInfo = document.createElement("div");
  senderInfo.id = "senderInfo";

  // 보낸이
  let mailSender = document.createElement("div");
  mailSender.onclick = writeMail;
  mailSender.id = "mailSender";

  // 보낸 시각
  let sendDate = document.createElement("div");
  sendDate.id = "sendDate";

  // 내용
  let receiveMailContext = document.createElement("div");
  receiveMailContext.id = "receiveMailContext";

  receiveMailHeader.appendChild(receiveMailTitle);
  receiveMailHeader.appendChild(reportMail);
  senderInfo.appendChild(mailSender);
  senderInfo.appendChild(sendDate);
  receiveMailInfo.appendChild(senderProfile);
  receiveMailInfo.appendChild(senderInfo);
  receiveMail.appendChild(back);
  receiveMail.appendChild(receiveMailHeader);
  receiveMail.appendChild(receiveMailInfo);
  receiveMail.appendChild(receiveMailContext);
  MAILBOX.appendChild(receiveMail);
  console.log("loaded receive mail form");
}

// 메일 신고 (미구현)
function mailReport() {
  let answer = requestMessage("해당 메일을 신고하시겠습니까?");
  if (answer) {
  }
}

// 메일 보내기 폼 요소 생성
function loadMailForm() {
  const BODY = document.getElementsByTagName("body").item(0);
  const BACKGROUND = document.getElementById("background");

  // 메일
  let mail = document.createElement("div");
  mail.style.display = "none";
  mail.id = "mail";

  // 메일 헤더
  let mailHeader = document.createElement("div");
  mailHeader.id = "mailHeader";

  // 닫기
  let back = document.createElement("div");
  back.onclick = writeMail;
  back.id = "mailBack";
  back.className = "back";
  back.innerHTML = "X";

  // 메일 헤더 텍스트
  let mailHeaderText = document.createElement("div");
  mailHeaderText.innerHTML = "새 메일";
  mailHeaderText.id = "mailHeaderText";

  // 전송
  let mailSend = document.createElement("div");
  mailSend.onclick = sendMail;
  mailSend.id = "mailSend";
  mailSend.innerHTML = "보내기";

  // 받는 사람
  let mailReceiver = document.createElement("div");
  mailReceiver.id = "mailReceiver";

  // 받는 사람 텍스트
  let mailReceiverText = document.createElement("div");
  mailReceiverText.innerHTML = "받는 사람";
  mailReceiverText.id = "mailReceiverText";

  // 받는 사람 사용자명
  let mailReceiverUser = document.createElement("div");
  mailReceiverUser.id = "mailReceiverUser";

  // 제목
  let mailTitle = document.createElement("input");
  mailTitle.type = "text";
  mailTitle.placeholder = "제목";
  mailTitle.id = "mailTitle";

  // 내용
  let mailContext = document.createElement("textarea");
  mailContext.id = "mailContext";

  mailHeader.appendChild(back);
  mailHeader.appendChild(mailHeaderText);
  mailReceiver.appendChild(mailReceiverText);
  mailReceiver.appendChild(mailReceiverUser);
  mail.appendChild(mailHeader);
  mail.appendChild(mailSend);
  mail.appendChild(mailReceiver);
  mail.appendChild(mailTitle);
  mail.appendChild(mailContext);

  BODY.appendChild(mail);
  console.log("loaded write mail form");
}

// 선택 메일 삭제
function deleteSelectedMail(e) {
  let deleteMail = document.getElementById("deleteMail");
  let deleteAllMail = document.getElementById("deleteAllMail");
  let mailCheckBox = document.getElementsByClassName("user_mail_checkbox");
  let DISPLAY = "none";

  if (deleteAllMail.style.display !== "none") {
    if (CHECKED_COUNT > 0) {
      let answer = requestMessage("선택한 메일을 삭제하시겠습니까?");
      if (answer) {
        let deletingMail = {};
        let idx = 1;
        for (let c of mailCheckBox) {
          if (c.checked) {
            deletingMail[idx] = idx;
          }
          idx++;
        }
        SOCKET.emit("request", { msg: "deleteMail", data: deletingMail });
      } else {
        return;
      }
    }
    DISPLAY = "none";
    deleteMail.innerHTML = "삭제";
  } else {
    DISPLAY = "block";
    deleteMail.innerHTML = "취소";
    CHECKED_COUNT = 0;
  }

  deleteAllMail.style.display = DISPLAY;

  for (let elem of mailCheckBox) {
    elem.style.display = DISPLAY;
  }
}

// 메일 한 개 선택함
function selectMail(e) {
  let deleteMail = document.getElementById("deleteMail");
  let deleteAllMail = document.getElementById("deleteAllMail");
  let mailCheckBox = document.getElementsByClassName("user_mail_checkbox");

  if (e.target.checked) {
    CHECKED_COUNT++;
  } else {
    CHECKED_COUNT--;
  }

  if (CHECKED_COUNT === 0) {
    deleteMail.innerHTML = "취소";
  } else if (CHECKED_COUNT > 0) {
    deleteMail.innerHTML = "삭제";
  } else {
    CHECKED_COUNT = 0;
  }

  if (CHECKED_COUNT === mailCheckBox.length && mailCheckBox.length > 0) {
    deleteAllMail.checked = true;
  } else {
    deleteAllMail.checked = false;
  }
}

// 모든 메일 선택함
function selectAllMail() {
  let deleteMail = document.getElementById("deleteMail");
  let deleteAllMail = document.getElementById("deleteAllMail");
  let mailCheckBox = document.getElementsByClassName("user_mail_checkbox");
  let CHECK = deleteAllMail.checked ? true : false;
  let ACC = deleteAllMail.checked ? 1 : -1;

  for (let elem of mailCheckBox) {
    if (elem.checked !== CHECK) {
      elem.checked = CHECK;
      CHECKED_COUNT += ACC;
    }
  }

  if (CHECKED_COUNT === 0) {
    deleteMail.innerHTML = "취소";
  } else if (CHECKED_COUNT > 0) {
    deleteMail.innerHTML = "삭제";
  } else {
    CHECKED_COUNT = 0;
  }
}

// 메일 목록 창
function openMailBox() {
  let mailBox = document.getElementById("mailBox");

  if (mailBox.style.display !== "none") {
    mailBox.style.display = "none";
  } else {
    let receiveMailList = document.getElementById("receiveMailList");
    while (receiveMailList.hasChildNodes()) {
      receiveMailList.firstChild.remove();
    }
    SOCKET.emit("request", { msg: "getMailList" });
    mailBox.style.display = "flex";
  }
}

// 받은메일 한 개 확인 창
function openReceiveMail(e) {
  let receiveMail = document.getElementById("receiveMail");

  if (receiveMail.style.display !== "none") {
    receiveMail.style.display = "none";
  } else {
    let data = MAIL_BOX[e.target.value];
    let mailSender = document.getElementById("mailSender");
    let sendDate = document.getElementById("sendDate");
    let receiveMailTitle = document.getElementById("receiveMailTitle");
    let receiveMailContext = document.getElementById("receiveMailContext");
    let dateF = new Date(data["date"]);

    mailSender.innerHTML = data["sender"];
    mailSender.value = data["sender"];
    sendDate.innerHTML =
      dateF.getFullYear() +
      "년 " +
      (dateF.getMonth() + 1) +
      "월 " +
      dateF.getDate() +
      "일 " +
      dateF.getHours() +
      "시 " +
      dateF.getMinutes() +
      "분 " +
      dateF.getSeconds() +
      "초";
    receiveMailTitle.innerHTML = data["title"];
    receiveMailContext.innerHTML = data["context"];

    receiveMail.style.display = "flex";

    if (data["isRead"] === "False") {
      SOCKET.emit("request", {
        msg: "readMail",
        data: { idx: e.target.value + 1, date: Date.now() },
      });
    }
  }
}

// 메일 작성 창
function writeMail(e) {
  let mail = document.getElementById("mail");

  if (mail.style.display !== "none") {
    mail.style.display = "none";
  } else {
    let mailReceiverUser = document.getElementById("mailReceiverUser");
    let mailSend = document.getElementById("mailSend");
    mailReceiverUser.innerHTML = e.target.value;
    mailSend.value = e.target.value;
    mail.style.display = "flex";
  }
}

// 메일 보내기 창
function sendMail(e) {
  let target = e.target.value;
  let title = document.getElementById("mailTitle").value;
  let context = document
    .getElementById("mailContext")
    .value.replaceAll("\n", "<br>");
  let sendBtn = document.getElementById("mailSend");
  let date = Date.now();

  if (title === "") {
    actionMessage("제목을 입력해주세요.");
  } else if (context === "") {
    actionMessage("내용을 입력해주세요.");
  } else {
    sendBtn.onclick = "";
    SOCKET.emit("request", {
      msg: "sendMail",
      data: { receiver: target, title: title, context: context, date: date },
    });
  }
}

// 메일 목록 업데이트
function mailBoxUpdate(data) {
  MAIL_BOX = data;
  let receiveMailCount = document.getElementById("receiveMailCount");
  let notReadMailCount = document.getElementById("notReadMailCount");
  let receiveMailList = document.getElementById("receiveMailList");
  let notread = 0;

  const CREATE_MAIL = (mail, idx) => {
    let mailPkg = document.createElement("div");
    let mailIdx = document.createElement("div");
    let checkbox = document.createElement("input");
    mailPkg.className = "mailPkg";
    mailIdx.onclick = openReceiveMail;
    mailIdx.value = idx;
    mailIdx.className = "user_mail";
    if (mail["isRead"] !== "False") {
      mailIdx.style.color = "gray";
    } else {
      notread++;
    }
    mailIdx.innerHTML = mail["title"];
    checkbox.onclick = selectMail;
    checkbox.value = idx;
    checkbox.className = "user_mail_checkbox";
    checkbox.style.display = "none";
    checkbox.type = "checkbox";
    mailPkg.appendChild(checkbox);
    mailPkg.appendChild(mailIdx);
    receiveMailList.appendChild(mailPkg);
  };

  while (receiveMailList.hasChildNodes()) {
    receiveMailList.firstChild.remove();
  }

  for (let i = 0; i < data.length; i++) {
    CREATE_MAIL(data[i], i);
  }

  receiveMailCount.innerHTML = "총 " + data.length + "개";
  receiveMailCount.value = data.length;
  notReadMailCount.innerHTML = "안 읽은 메일 " + notread + "개";
  notReadMailCount.value = notread;
}

console.log("loaded mail.js");
