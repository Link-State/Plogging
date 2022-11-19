let START_TIME = -1;
let TIMER = -1;
let TIMECOUNT = -1;

// 플로깅 생성 요소
function loadPlogging() {
    const BODY = document.getElementsByTagName('body').item(0);
    
    // 플로깅
    let plogging = document.createElement('div');
    plogging.style.display = "none";
    plogging.id = "plogging";

    // 플로깅 타이틀
    let ploggingTitle = document.createElement('div');
    ploggingTitle.innerHTML = '플로깅';
    ploggingTitle.id = 'ploggingTitle';

    // 그림
    let getLocationImg = document.createElement('img');
    getLocationImg.id = 'getLocationImg';

    // 플로깅 안내문
    let ploggingNotice = document.createElement('div');
    ploggingNotice.innerHTML = '주최자의 위치를 기다리는 중 입니다.';
    ploggingNotice.id = 'ploggingNotice';

    // 위치받기
    let getLocationBtn = document.createElement('div');
    getLocationBtn.style.color = 'gray';
    getLocationBtn.innerHTML = '위치 받기';
    getLocationBtn.id = 'getLocationBtn';

    // 종료하기
    let stopPloggingBtn = document.createElement('div');
    stopPloggingBtn.style.display = 'none';
    stopPloggingBtn.innerHTML = '종료하기';
    stopPloggingBtn.id = 'stopPloggingBtn';

    plogging.appendChild(ploggingTitle);
    plogging.appendChild(getLocationImg);
    plogging.appendChild(ploggingNotice);
    plogging.appendChild(getLocationBtn);
    plogging.appendChild(stopPloggingBtn);

    BODY.appendChild(plogging);
}

// 플로깅 종료
function stopPlogging() {
    let answer;
    let msg = '';
    let stopPloggingBtn = document.createElement('div');
    stopPloggingBtn.onclick = '';

    if (CURRENTPLOGGING === USERID) {
        msg = 'stopPloggingByHost';
        answer = confirm("플로깅에 참가중인 유저들 모두 플로깅이 종료됩니다.\n플로깅을 종료하시겠습니까?");
    }
    else {
        msg = 'stopPlogging';
        answer = confirm("플로깅을 종료하시겠습니까?");
    }

    if (answer) {
        SOCKET.emit('request', {'msg':msg});
    }
    else {
        stopPloggingBtn.onclick = stopPlogging;
    }
}

// 플로깅 시작 타이머 생성
function loadPloggingTimer() {
    if (CURRENTPLOGGING !== '' && TIMER === -1) {
        TIMER = setInterval(() => {
            if (Date.now() >= START_TIME) {
                let ploggingNotice = document.getElementById('ploggingNotice');
                let getLocationBtn = document.getElementById('getLocationBtn');

                ploggingView();
                clearPloggingTimer();

                if (Date.now() - START_TIME < 180000) {
                    if (CURRENTPLOGGING !== USERID) {
                        TIMECOUNT = 180;
                        TIMER = setInterval(() => {
                            TIMECOUNT--;
                            if (TIMECOUNT <= 0) {
                                ploggingNotice.innerHTML = '선착순 위치 받기';
                                getLocationBtn.onclick = getLocation;
                                getLocationBtn.style.color = 'black';

                                clearPloggingTimer();
                            }
                        }, 1000);
                    }
                    else {
                        getLocationBtn.style.color = 'black';
                        getLocationBtn.onclick = getLocation;
                        TIMECOUNT = parseInt((180000 - (Date.now() - START_TIME)) / 1000);
                        TIMER = setInterval(() => {
                            TIMECOUNT--;
                            ploggingNotice.innerHTML = '기준위치를 찍으세요. 남은시간 : ' + TIMECOUNT + '초';
                            if (TIMECOUNT <= 0) {
                                clearPloggingTimer();
                                ploggingNotice.innerHTML = '선착순 위치 받기';
                            }
                        }, 1000);
                    }
                }
                else {
                    getLocationBtn.onclick = getLocation;
                    getLocationBtn.style.color = 'black';
                    ploggingNotice.innerHTML = '조금 늦었지만 바로 참가할 수 있어요!';
                }
            }
        }, 1000);
    }
}

// 위치 받아오기
function getLocation() {
    // pc에서는 비활성화
    if ('geolocation' in navigator) {
        let getLocationBtn = document.getElementById('getLocationBtn');
        getLocationBtn.onclick = '';

        navigator.geolocation.getCurrentPosition((position) => {
            // 정확도 받아서 일정 정확도 벗어나면 다시하기.
            SOCKET.emit('request', {'msg':'getLocation', 'data':{'latitude':position.coords.latitude, 'longitude':position.coords.longitude}});
        }, (e) => {
            // 권한 없음
            if (e.code === 1) {
                actionMessage("위치 권한이 필요합니다.");
            }
            // 위치 가져오기 실패
            else if (e.code === 2) {
                actionMessage("위치를 가져오는데에 실패했습니다.");
            }
            // 시간 초과
            else if (e.code === 3) {
                actionMessage("위치를 가져오는데에 너무 오래걸립니다. 다시 시도해주세요.");
            }
            getLocationBtn.onclick = getLocation;
        }, {
            enableHighAccuracy : true,
            timeout : 180000
        });
    }
    else {
        actionMessage("현재 브라우저로 플로깅에 참여할 수 없습니다. 다른 브라우저로 다시 시도해주세요.");
    }
}

// 타이머 강제종료
function clearPloggingTimer() {
    clearInterval(TIMER);
    TIMER = -1;
    TIMECOUNT = -1;
}

// 플로깅 페이지 토글
function ploggingView(t) {
    let plogging = document.getElementById('plogging');

    if (t === true) {
        plogging.style.display = 'block';
    }
    else if (t === false) {
        plogging.style.display = 'none';
    }
    else {
        if (plogging.style.display !== 'none') {
            plogging.style.display = 'none';
        }
        else {
            plogging.style.display = 'block';
        }
    }
}

console.log('loaded plogging.js');