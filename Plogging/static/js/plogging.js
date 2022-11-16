let START_TIME = -1;
let TIMER = -1;
/**
 * <초기화>
 * 
 * 첫 로그인 시, 현재 유저가 예약한 플로깅 스케줄을 확인함.
 * (플로깅 시작 전의 경우) 타이머 셋팅 후, 다 되면 <플로깅 창> 띄움.
 * (플로깅 시작 후, 종료 전일 경우) 바로 <플로깅 창> 띄움, 보상 부분에 패널티 부과함.
 * (플로깅 종료 후일 경우) 이용부분에 패널티 부과함.
 * 
 * 
 * <플로깅 창>
 * 
 * (호스트가 위치찍기 전) : 일반 참가자들에게는 '호스트가 위치를 받아오는 중 입니다.' 멘트 출력.
 * ㄴ 호스트에게는 위치를 받게끔 함.
 * ㄴ 이 때 5분 이내 위치를 받지 않는 경우, 다른 랜덤한 유저에게 호스트가 넘어가고 원래 호스트는 일반 유저로 강등 됨.
 * ㄴ 모든 유저에게 호스트가 돌고, 아무도 위치를 받지 않으면 해당 플로깅은 종료, 모든 유저는 패널티 처리.
 * 
 * (호스트가 위치찍은 후) : 일반 참가자들에게 호스트와 동일하게 위치 받게끔 함.
 * ㄴ 호스트는 유저의 절반 이상이 위치를 받았을 때 플로깅을 시작할 수 있음.
 * ㄴ 각 유저는 호스트와 동일하게 위치를 찍은 후, 호스트와의 거리가 너무 멀지 않은지 검사를 통과한 후에 플로깅 시작 가능함.
 * 
 * (호스트에 의해 플로깅 종료일 경우)
 * (투표에 의해 플로깅 종료일 경우)
 * (개인의 플로깅 강제종료일 경우)
 * 
 * 
 * <보상>
 * 동일한 시간을 플로깅했다고 가정 하에 호스트와 일반참가자의 보상은 동일함.
 * 보상은 얼마나?
 * 
 * 
 * <악용>
 * 한 명의 유저가 여러 공기계로 일명 '작'을 한다면...? 흠.. => 이는 게임에서도.....못막은..부분아닌가..
 * 
 * 
 * <플로깅 과정 증명>
 * 플로깅을 진짜로 했는지 어떤 방법으로 증명할 것인가?
 */

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
    getLocationBtn.onclick = getLocation;
    getLocationBtn.innerHTML = '위치 받기';
    getLocationBtn.id = 'getLocationBtn';

    plogging.appendChild(ploggingTitle);
    plogging.appendChild(getLocationImg);
    plogging.appendChild(ploggingNotice);
    plogging.appendChild(getLocationBtn);

    BODY.appendChild(plogging);
}

// 플로깅 타이머 생성
function loadPloggingTimer() {
    // 입장 시 타이머 자동 생성
    // 플로깅 참가 시, 타이머 생성
    // 플로깅 참가 취소 시, 타이머도 삭제
    if (TIMER === -1) {
        TIMER = setInterval(() => {
            if (CURRENTPLOGGING !== '') {
                if (Date.now() >= START_TIME) {
                    let plogging = document.getElementById('plogging');
                    plogging.style.display = 'block';

                    clearInterval(TIMER);
                    TIMER = -1;
                }
            }
            else {
                clearInterval(TIMER);
                TIMER = -1;
            }
        }, 1000);
    }
}

function getLocation() {
    let getLocationBtn = document.getElementById('getLocationBtn');
    
    // 위치 찍어서 보냄
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);

            // getLocationBtn.onclick = ''; // 위치찍혔으면 비활성화
            // SOCKET.emit('request', {'msg':'getLocation', 'data':});
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
        }, (data) => {
            // 고정밀 데이터
            console.log(data);
        });
    }
    else {
        actionMessage("이 브라우저로 플로깅에 참여할 수 없습니다. 다른 브라우저로 다시 시도해주세요.");
    }
}

console.log('loaded plogging.js');