let MAIL_BOX = [];
let CHECKED_COUNT = 0;

// 받은 메일함 요소 생성
function loadMailBox() {
    const BACKGROUND = document.getElementById('background');

    // 메일함
    let mailBox = document.createElement('div');
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
    receiveMailCount.innerHTML = '메일 : N건';
    receiveMailCount.id = 'receiveMailCount';

    // 안읽은 메일 갯수
    let notReadMailCount = document.createElement('div');
    notReadMailCount.innerHTML = '안읽음 : N건';
    notReadMailCount.id = 'notReadMailCount';

    // 메일 삭제
    let deleteMail = document.createElement('div');
    deleteMail.onclick = deleteSelectedMail;
    deleteMail.innerHTML = '삭제';
    deleteMail.id = 'deleteMail';

    // 전체삭제
    let deleteAllMail = document.createElement('input');
    deleteAllMail.onclick = selectAllMail;
    deleteAllMail.style.opacity = 0;
    deleteAllMail.type = 'checkbox';
    deleteAllMail.id = 'deleteAllMail';

    // 메일 목록
    let receiveMailList = document.createElement('div');
    receiveMailList.id = 'receiveMailList';

    mailBoxHeader.appendChild(receiveMailCount);
    mailBoxHeader.appendChild(notReadMailCount);
    mailBox.appendChild(back);
    mailBox.appendChild(mailBoxHeader);
    mailBox.appendChild(deleteAllMail);
    mailBox.appendChild(deleteMail);
    mailBox.appendChild(receiveMailList);
    BACKGROUND.appendChild(mailBox);
}

// 받은 메일 폼 요소 생성
function loadReceiveMailForm() {
    const MAILBOX = document.getElementById('mailBox');

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
    let mailSender = document.createElement('div');
    mailSender.onclick = writeMail;
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

    // 신고
    let reportMail = document.createElement('div');
    reportMail.onclick = mailReport;
    reportMail.innerHTML = "신고";
    reportMail.id = 'reportMail';

    receiveMailInfo.appendChild(mailSender);
    receiveMailInfo.appendChild(sendDate);
    receiveMail.appendChild(back);
    receiveMail.appendChild(receiveMailInfo);
    receiveMail.appendChild(receiveMailTitle);
    receiveMail.appendChild(receiveMailContext);
    receiveMail.appendChild(reportMail);
    MAILBOX.appendChild(receiveMail);
}

// 메일 신고 (미구현)
function mailReport() {
    let answer = confirm('해당 메일을 신고하시겠습니까?');
    if (answer) {

    }
}

// 메일 보내기 폼 요소 생성
function loadMailForm() {
    const BODY = document.getElementsByTagName('body').item(0);

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

    BODY.appendChild(mail);
}

// 선택 메일 삭제
function deleteSelectedMail(e) {
    let deleteMail = document.getElementById('deleteMail');
    let deleteAllMail = document.getElementById('deleteAllMail');
    let mailCheckBox = document.getElementsByClassName('user_mail_checkbox');
    let OPACITY = 0;

    if (deleteAllMail.style.opacity !== '0') {
        if (CHECKED_COUNT > 0) {
            let answer = confirm('선택한 메일을 삭제하시겠습니까?');
            if (answer) {
                let deletingMail = {};
                let idx = 1;
                for (let c of mailCheckBox) {
                    if (c.checked) {
                        deletingMail[idx] = idx;
                    }
                    idx++;
                }
                SOCKET.emit('request', {'msg':'deleteMail', 'data':deletingMail});
            }
            else {
                return;
            }
        }
        deleteMail.innerHTML = '삭제';
        deleteAllMail.style.opacity = 0;
        OPACITY = 0;
    }
    else {
        deleteMail.innerHTML = '취소';
        deleteAllMail.style.opacity = 1;
        OPACITY = 1;
        CHECKED_COUNT = 0;
    }

    for (let elem of mailCheckBox) {
        elem.style.opacity = OPACITY;
    }
}

// 메일 한 개 선택함
function selectMail(e) {
    let deleteMail = document.getElementById('deleteMail');
    let deleteAllMail = document.getElementById('deleteAllMail');
    let mailCheckBox = document.getElementsByClassName('user_mail_checkbox');

    if (e.target.checked) {
        CHECKED_COUNT++;
    }
    else {
        CHECKED_COUNT--;
    }

    if (CHECKED_COUNT === 0) {
        deleteMail.innerHTML = '취소';
    }
    else if (CHECKED_COUNT > 0) {
        deleteMail.innerHTML = '삭제';
    }
    else {
        CHECKED_COUNT = 0;
    }

    if (CHECKED_COUNT === mailCheckBox.length && mailCheckBox.length > 0) {
        deleteAllMail.checked = true;
    }
    else {
        deleteAllMail.checked = false;
    }

}

// 모든 메일 선택함
function selectAllMail() {
    let deleteMail = document.getElementById('deleteMail');
    let deleteAllMail = document.getElementById('deleteAllMail');
    let mailCheckBox = document.getElementsByClassName('user_mail_checkbox');
    let CHECK = deleteAllMail.checked ? true : false;
    let ACC = deleteAllMail.checked ? 1 : -1;

    for (let elem of mailCheckBox) {
        if (elem.checked !== CHECK) {
            elem.checked = CHECK;
            CHECKED_COUNT += ACC;
        }
    }

    if (CHECKED_COUNT === 0) {
        deleteMail.innerHTML = '취소';
    }
    else if (CHECKED_COUNT > 0) {
        deleteMail.innerHTML = '삭제';
    }
    else {
        CHECKED_COUNT = 0;
    }
}

// 메일 목록 창
function openMailBox() {
    let mailBox = document.getElementById('mailBox');

    if (mailBox.style.display !== 'none') {
        mailBox.style.display = 'none';
    }
    else {
        let receiveMailList = document.getElementById('receiveMailList');
        while (receiveMailList.hasChildNodes()) {
            receiveMailList.firstChild.remove();
        }
        SOCKET.emit('request', {'msg':"getMailList"});
        mailBox.style.display = 'block';
    }
}

// 받은메일 한 개 확인 창
function openReceiveMail(e) {
    let receiveMail = document.getElementById('receiveMail');
    
    if (receiveMail.style.display !== "none") {
        receiveMail.style.display = "none";
    }
    else {
        let data = MAIL_BOX[e.target.value];
        let mailSender = document.getElementById('mailSender');
        let sendDate = document.getElementById('sendDate');
        let receiveMailTitle = document.getElementById('receiveMailTitle');
        let receiveMailContext = document.getElementById('receiveMailContext');

        mailSender.innerHTML = "보낸이 : " + data['sender'];
        mailSender.value = data['sender'];
        sendDate.innerHTML = "보낸시간 : " + data['date'];
        receiveMailTitle.innerHTML = data['title'];
        receiveMailContext.innerHTML = data['context'];

        receiveMail.style.display = "inline-block";

        if (data['isRead'] === 'False') {
            SOCKET.emit('request', {'msg':'readMail', 'data':{'idx':e.target.value+1, 'date':Date.now()}});
        }
    }
}

// 메일 작성 창
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

// 메일 보내기 창
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

// 메일 목록 업데이트
function mailBoxUpdate(data) {
    MAIL_BOX = data;
    let receiveMailCount = document.getElementById('receiveMailCount');
    let notReadMailCount = document.getElementById('notReadMailCount');
    let receiveMailList = document.getElementById('receiveMailList');
    let notread = 0;

    const CREATE_MAIL = (mail, idx) => {
        let mailPkg = document.createElement('div');
        let mailIdx = document.createElement('div');
        let checkbox = document.createElement('input');
        mailPkg.className = 'mailPkg';
        mailIdx.onclick = openReceiveMail;
        mailIdx.value = idx;
        mailIdx.className = 'user_mail';
        if (mail['isRead'] !== 'False') {
            mailIdx.style.color = 'gray';
        }
        else {
            notread++;
        }
        mailIdx.innerHTML = mail['title'];
        checkbox.onclick = selectMail;
        checkbox.value = idx;
        checkbox.className = 'user_mail_checkbox';
        checkbox.style.opacity = 0;
        checkbox.type = 'checkbox';
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

    receiveMailCount.innerHTML = "메일 : " + data.length + "건";
    receiveMailCount.value = data.length;
    notReadMailCount.innerHTML = "안읽음 : " + notread + "건";
    notReadMailCount.value = notread;
}

console.log('loaded mail.js');

/**
 * <문제> - (해결)
 * 와 대박 중대오류 발견, 플라스크쪽에서 emit을 하면 해당 서버에 접속중인 모든 유저에게 Broadcast함.
 * Room기능 이용해서 각 유저의 고유id로 room을 만들어서 사용해야 됨.
 * A 유저가 B 유저의 room에 접속할 경우 서버쪽에서 비교하여 퇴치함. 
 * <참고해야 할 문서>
 * flask-socketio 문서 : https://flask-socketio.readthedocs.io/en/latest/getting_started.html#rooms
 * socketio 문서 : https://socket.io/docs/v4/client-api/#io
 * <해결>
 * flask쪽에서 socketio.emit(..args)이 아닌 flask에서 emit만 import받은 후, emit(..args)를 사용했더니 됨.
 * 
 * 1. 버그픽스 <해결>
 * 2. 메일 마저 구현 <해결>
 * 3. 이번주 내로 플로깅 기능만 구축, 나머지는 미구현.
 * 4. 플로깅 기능 구축 후 바로 디자인 시작
 */