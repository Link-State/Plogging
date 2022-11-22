// 팝업메세지창
function actionMessage(msg) {
    
    // 임시 사용
    alert(msg);
}

// 선택창
function requestMessage(msg) {
    
    // 임시 사용
    let answer = confirm(msg);
    if (answer) {
        return true;
    }
    return false;
}

