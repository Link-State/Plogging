const SOCKET = io.connect("http://" + document.domain + ":" + location.port);

SOCKET.on('response', function(data) {
    if (data.msg === 'initialize') {
        USERID = data['data']['userID'];
        CURRENTPLOGGING = data['data']['currentPlogging'];
    }
    else if (data.msg === 'successUpload') {
        CURRENTPLOGGING = USERID;
        let post = document.getElementById('post');
    
        if (post.style.display !== "none") {
            post.style.display = "none";
        }
        searchPost();
        alert('게시글을 올렸습니다.');
    }
    else if (data.msg === 'deletePost') {
        CURRENTPLOGGING = '';
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }
        searchPost();
        alert('게시글이 삭제되었습니다.');
    }
    else if (data.msg === 'joinPlogging') {
        CURRENTPLOGGING = data['data'];
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }
        searchPost();
        alert('플로깅에 참가가 완료되었습니다.');
    }
    else if (data.msg === 'leftPlogging') {
        CURRENTPLOGGING = '';
        let userPost = document.getElementById('userPost');
    
        if (userPost.style.display !== "none") {
            userPost.style.display = "none";
        }
        searchPost();
        alert('해당 플로깅의 참가 취소가 완료되었습니다.');
    }
    else if (data.msg === 'sendMail') {
        let mail = document.getElementById('mail');
        let sendBtn = document.getElementById('mailSend');
        sendBtn.onclick = sendMail;

        if (mail.style.display !== "none") {
            mail.style.display = "none";
        }
        alert('메일이 전송되었습니다.');
    }
    else if (data.msg === 'deletedMail') {
        SOCKET.emit('request', {'msg':"getMailList"});
        alert('메일이 삭제되었습니다.');
    }
    else if (data.msg === 'readMail') {
        let idx = parseInt(data.data)-1;
        let mail = document.getElementsByClassName('user_mail');
        let notReadMailCount = document.getElementById('notReadMailCount');

        mail.item(idx).style.color = "gray";
        notReadMailCount.innerHTML = "안읽음 : " + (notReadMailCount.value - 1) + "건";
    }
    else if (data.msg === 'alreadyPost') {
        alert('더이상 게시글을 올릴 수 없습니다.');
    }
    else if (data.msg === 'postNotExist') {
        alert('게시글이 존재하지 않습니다.');
    }
    else if (data.msg === 'fullMember') {
        alert('이미 인원이 가득 찼습니다.');
    }
    else if (data.msg === 'notExistMember') {
        alert('해당 플로깅에 참가중이지 않습니다.');
    }
    else if (data.msg === 'alreadyPlogging') {
        alert('이미 플로깅에 참가중입니다.');
    }
    else if (data.msg === 'noSendSelf') {
        alert('자기 자신에게는 메일을 보낼 수 없습니다.');
    }
    else if (data.msg === 'notExistMail') {
        alert('존재하지 않는 메일입니다.');
    }
    else if (data.msg === 'notExistUser') {
        alert('존재 하지 않는 유저입니다.');
    }
    else if (data.msg === 'sessionFail') {
        alert('세션이 끊어졌습니다. 다시 로그인 해주세요.');
    }
    else if (data.msg === 'invalidUser') {
        alert('존재하지 않는 유저입니다. 로그인 먼저 해주세요.');
    }
    else if (data.msg === 'boardList') {
        let searchBtn = document.getElementById('search');
        searchBtn.onclick = searchPost;
        boardUpdate(data['data']);
    }
    else if (data.msg == 'mailList') {
        mailBoxUpdate(data['data']);
    }
    else if (data.msg === 'send!') {
        console.log("response!");
    }
});

console.log('loaded connection.js');