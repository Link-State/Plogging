
// 받은 메일함 요소 생성
function loadMailBox() {
    const BACKGROUND = document.getElementById('background');

    // 메일함
    let mailBox = document.createElement('mailBox');
    mailBox.style.display = 'none';
    mailBox.id = "mailBox";

    // 닫기
    let back = document.createElement('div');
    back.onclick = openMailBox;
    back.innerHTML = "X";
    back.id = "mailBoxBack";
    back.className = "back";

    // 메일함 메뉴
    let mailBoxHeader = document.createElement('div');
    mailBoxHeader.id = 'mailBoxHeader';

    // 받은 메일 갯수
    let receiveMailCount = document.createElement('div');
    receiveMailCount.id = 'receiveMailCount';

    // 안읽은 메일 갯수
    let notReadMailCount = document.createElement('div');
    notReadMailCount.id = 'notReadMailCount';

    // 메일 목록
    let receiveMailList = document.createElement('div');
    receiveMailList.id = 'receiveMailList';

    mailBoxHeader.appendChild(receiveMailCount);
    mailBoxHeader.appendChild(notReadMailCount);
    mailBox.appendChild(back);
    mailBox.appendChild(mailBoxHeader);
    mailBox.appendChild(receiveMailList);
    BACKGROUND.appendChild(mailBox);
}

// 받은 메일 폼 요소 생성
function loadReceiveMailForm() {
    const BACKGROUND = document.getElementById('background');

    // 받은 메일
    let receiveMail = document.createElement('div');
    receiveMail.style.display = "none";
    receiveMail.id = 'receiveMail';

    // 닫기
    let back = document.createElement('div');
    back.onclick = openReceiveMail;
    back.innerHTML = "X";
    back.id = "receiveMailBack";
    back.className = "back";

    // 메일 정보
    let receiveMailInfo = document.createElement('div');
    receiveMailInfo.id = 'receiveMailInfo';

    // 보낸이
    // 보낸이 누르면 답장할 수 있도록!
    let mailSender = document.createElement('div');
    mailSender.id = 'mailSender';

    // 보낸 시각
    let sendDate = document.createElement('div');
    sendDate.id = 'sendDate';

    // 제목
    let receiveMailTitle = document.createElement('div');
    receiveMailTitle.id = 'receiveMailTitle';

    // 내용
    let receiveMailContext = document.createElement('div');
    receiveMailContext.id = 'receiveMailContext';

    receiveMailInfo.appendChild(mailSender);
    receiveMailInfo.appendChild(sendDate);
    receiveMail.appendChild(back);
    receiveMail.appendChild(receiveMailInfo);
    receiveMail.appendChild(receiveMailTitle);
    receiveMail.appendChild(receiveMailContext);
    BACKGROUND.appendChild(receiveMail);
}

// 메일 폼 요소 생성
function loadMailForm() {
    const BOARD = document.getElementById('board');

    // 메일
    let mail = document.createElement('div');
    mail.style.display = 'none';
    mail.id = 'mail';

    // 닫기
    let back = document.createElement('div');
    back.onclick = writeMail;
    back.id = "mailBack";
    back.className = "back";
    back.innerHTML = "X";

    // 받는이
    let mailReceiver = document.createElement('div');
    mailReceiver.id = 'mailReceiver';

    // 제목
    let mailTitle = document.createElement('input');
    mailTitle.type = "text";
    mailTitle.id = 'mailTitle';

    // 내용
    let mailContext = document.createElement('textarea');
    mailContext.id = 'mailContext';

    // 전송
    let mailSend = document.createElement('div');
    mailSend.onclick = sendMail;
    mailSend.id = 'mailSend';
    mailSend.innerHTML = '보내기';

    mail.appendChild(back);
    mail.appendChild(mailReceiver);
    mail.appendChild(mailTitle);
    mail.appendChild(mailContext);
    mail.appendChild(mailSend);

    BOARD.appendChild(mail);
}

// 메일함 토글
function openMailBox() {
    let mailBox = document.getElementById('mailBox');

    if (mailBox.style.display !== 'none') {
        mailBox.style.display = 'none';
    }
    else {
        SOCKET.emit('request', {'msg':"getMailList"});
        mailBox.style.display = 'block';
    }
}

// 받은메일 토글
function openReceiveMail(e) {
    let receiveMail = document.getElementById('receiveMail');
    
    if (receiveMail.style.display !== "none") {
        receiveMail.style.display = "none";
    }
    else {
        let mailSender = document.getElementById('mailSender');
        mailSender.value = e.target.id;

        receiveMail.style.display = "block";
    }
}

// 메일 폼 토글
function writeMail(e) {
    let mail = document.getElementById('mail');

    if (mail.style.display !== 'none') {
        mail.style.display = 'none';
    }
    else {
        let mailReceiver = document.getElementById('mailReceiver');
        let mailSend = document.getElementById('mailSend');
        mailReceiver.innerHTML = e.target.value;
        mailSend.value = e.target.value;
        mail.style.display = 'block';
    }
}

// 메일 보내기
function sendMail(e) {
    let target = e.target.value;
    let title = document.getElementById('mailTitle').value;
    let context = document.getElementById('mailContext').value.replaceAll('\n', "<br>");
    let sendBtn = document.getElementById('mailSend');
    let date = Date.now();

    if (title === '') {
        actionMessage('제목');
    }
    else if (context === '') {
        actionMessage('내용');
    }
    else {
        sendBtn.onclick = '';
        SOCKET.emit('request', {'msg':"sendMail", 'data':{'receiver':target, 'title':title, 'context':context, 'date':date}});
    }
}

// 메일함 업데이트
function mailBoxUpdate(data) {
    // 0번째 우편은 제외
    // ADMIN만 mailbox 있음, 나는 없어서 mailbox없기 때문에 오류 안나게 해야함.
}