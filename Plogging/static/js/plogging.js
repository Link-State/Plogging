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

    // 플로깅 위치인증 남은시간
    let ploggingVerifyRemainTime = document.createElement('div');
    ploggingVerifyRemainTime.id = 'ploggingVerifyRemainTime';

    // 플로깅 정보
    let ploggingMetaData = document.createElement('div');
    ploggingMetaData.id = "ploggingMetaData";

    // 플로깅 시작 시간
    let ploggingNow = document.createElement('div');
    ploggingNow.innerHTML = "언제?&nbsp;&nbsp;&nbsp;";
    ploggingNow.id = "ploggingNow";

    // 플로깅 장소
    let ploggingArea = document.createElement('div');
    ploggingArea.innerHTML = "어디서?&nbsp;&nbsp;&nbsp;";
    ploggingArea.id = "ploggingArea";

    // 플로깅 안내문
    let ploggingNotice = document.createElement('div');
    ploggingNotice.innerHTML = '주최자의 기준 위치를 기다리는 중 입니다.';
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

    if (PLOGGING_START_POINT !== null && PLOGGING_START_TIME !== null) {
        ploggingArea.innerHTML += LocationToString(PLOGGING_START_POINT);
        ploggingNow.innerHTML += DateToString(PLOGGING_START_TIME);
    }

    ploggingMetaData.appendChild(ploggingNow);
    ploggingMetaData.appendChild(ploggingArea);
    plogging.appendChild(ploggingVerifyRemainTime);
    plogging.appendChild(CREATE_LINE());
    plogging.appendChild(ploggingMetaData);
    plogging.appendChild(CREATE_LINE());
    plogging.appendChild(ploggingNotice);
    plogging.appendChild(getLocationBtn);
    plogging.appendChild(stopPloggingBtn);

    BODY.appendChild(plogging);
    console.log("loaded plogging window");
}

// 플로깅 종료
function stopPlogging() {
    let answer;
    let msg = '';
    let stopPloggingBtn = document.createElement('div');
    stopPloggingBtn.onclick = '';

    if (CURRENTPLOGGING === USERID) {
        msg = 'stopPloggingByHost';
        answer = requestMessage("플로깅에 참가중인 유저들 모두 플로깅이 종료됩니다.\n플로깅을 종료하시겠습니까?");
    }
    else {
        msg = 'stopPlogging';
        answer = requestMessage("플로깅을 종료하시겠습니까?");
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
                let ploggingVerifyRemainTime = document.getElementById('ploggingVerifyRemainTime');
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
                                ploggingNotice.innerHTML = '주최자가 기준위치를 입력하지 않았습니다.<br>선착순 기준위치 입력하기';
                                getLocationBtn.onclick = getLocation;
                                getLocationBtn.style.color = 'white';

                                clearPloggingTimer();
                            }
                        }, 1000);
                    }
                    else {
                        getLocationBtn.style.color = 'white';
                        getLocationBtn.onclick = getLocation;
                        ploggingNotice.innerHTML = '기준위치를 입력하세요.';
                        TIMECOUNT = parseInt((180000 - (Date.now() - START_TIME)) / 1000);
                        TIMER = setInterval(() => {
                            TIMECOUNT--;
                            ploggingVerifyRemainTime.innerHTML = '남은 시간: ' + TIMECOUNT + '초';
                            if (TIMECOUNT <= 0) {
                                clearPloggingTimer();
                                ploggingVerifyRemainTime.innerHTML = '';
                                ploggingNotice.innerHTML = '선착순 기준위치 입력하기';
                            }
                        }, 1000);
                    }
                }
                else {
                    getLocationBtn.onclick = getLocation;
                    getLocationBtn.style.color = 'white';
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

function LocationToString(loc) {
    return loc['state'] + " " +
    loc['country'] + " " + 
    loc['zone'] + " " + 
    loc['section'];
}

function DateToString(date) {
    return date['y'] + "년 " + 
    date['M'] + "월 " +
    date['d'] + "일(" +
    date['w'][0] + ") " +
    date['h'] + "시 " +
    date['m'] + "분";
}

console.log('loaded plogging.js');