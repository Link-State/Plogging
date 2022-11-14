
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

    // 받은 메일 갯수

    // 안읽은 메일 갯수

    // 메일함 메인

    // 메일 목록 receiveMailList

    mailBox.appendChild(back);
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

    // 보낸이
    // 보낸이 누르면 답장할 수 있도록!

    // 보낸 시각

    // 제목


    receiveMail.appendChild(back);
    BACKGROUND.appendChild(receiveMail);
}

// 메일 폼 요소 생성
function loadMailForm() {
    const BOARD = document.getElementById('background');

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
        mailBox.style.display = 'block';
    }
}

// 받은메일 토글
function openReceiveMail() {
    let receiveMail = document.getElementById('receiveMail');
    
    if (receiveMail.style.display !== "none") {
        receiveMail.style.display = "none";
    }
    else {
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