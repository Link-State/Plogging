let TUTORIAL = localStorage.getItem("tutorial");
let TYPE_TIMER = -1;
let CURRENT_MSG = [];
let CONTEXT_IDX = 0;

function loadTutorial() {
    const BODY = document.getElementsByTagName('body').item(0);

    // 튜토리얼
    let tutorial = document.createElement('div');
    tutorial.style.display = "none";
    tutorial.id = "tutorial";

    // 튜토리얼 배경화면
    let tutorialBG = document.createElement('div');
    tutorialBG.id = "tutorialBG";

    // 튜토리얼 하단바
    let noticeBar = document.createElement('div');
    noticeBar.id = "noticeBar";

    // 튜토리얼 텍스트
    let noticeText = document.createElement('span');
    noticeText.id = "noticeText";

    // 튜토리얼 안내자 이미지
    let speaker = document.createElement('div');
    speaker.id = "speaker";

    // 계속 하려면 누르기
    let guideContinue = document.createElement('span');
    guideContinue.innerHTML = "계속하려면 누르기 >>";
    guideContinue.id = "guideContinue";

    noticeBar.appendChild(noticeText);
    noticeBar.appendChild(speaker);
    noticeBar.appendChild(guideContinue);
    tutorial.appendChild(tutorialBG);
    tutorial.appendChild(noticeBar);
    BODY.appendChild(tutorial);

    if (TUTORIAL === null) {
        TUTORIAL = {
            "first":true,
            "plogging":true,
            "shop":true
        };
        window.addEventListener('click', isTutorial);

        localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
    }
    else {
        TUTORIAL = JSON.parse(TUTORIAL);

        let keys = Object.keys(TUTORIAL);
        for (let key of keys) {
            if (TUTORIAL[key]) {
                window.addEventListener('click', isTutorial);
                break;
            }
        }
    }

    if (TUTORIAL["first"]) {
        msgs = [
            '"멍멍!"',
            "학교에 강아지가 나타났습니다.",
            "강아지는 이 주변을 보금자리로 자리잡은 것 같습니다.",
            "강아지와 함께 이 곳을 둘러봅시다."
        ];
        Guide(msgs);
        TUTORIAL['first'] = false;
        localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
    }
}

function isTutorial(e) {
    let id = e.target.id;
    let keys = Object.keys(TUTORIAL);
    let count = 0;
    for (let key of keys) {
        if (TUTORIAL[key]) {
            count++;
        }
    }

    if (count <= 0) {
        window.removeEventListener('click', isTutorial);
    }

    if (id === 'menu_0') {
        msgs = [
            "여기는 플로깅을 모집하고 직접 참여하는 공간이네요!",
            "이 곳을 통해 플로깅에 참여하면 제 보금자리를 꾸미는데 필요한 '플라스틱'을 얻을 수 있어요.",
            "플로깅 모집에 주의사항이 있다면 (1) 최소 1시간 이후부터 모집 가능하다는 점. (2) 플로깅 시작 1시간 전에는 참가/참가취소가 불가능하다는 점. 흠..... 이정도겠네요.",
            "이제 플로깅을 통해 자연도 회복하고 귀여운 저도 키워주세요.."
        ];
        Guide(msgs);
        TUTORIAL['plogging'] = false;
        localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
    }
    else if (id === 'menu_2') {
        msgs = [
            "여기는 상점이에요. 플로깅을 통해 모은 플라스틱으로 보금자리를 꾸미는데 필요한 아이템들을 살 수 있어요.",
            "지금은... 상품이 2개밖에 없네요. 아직 입점한지 얼마 안되서 그런가봐요.",
            "혹시 모르지 않을까요? 나중에는 더 많은 것들이 생길지!"
        ];
        Guide(msgs);
        TUTORIAL['shop'] = false;
        localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
    }
}

function Guide(msgs) {
    CURRENT_MSG = msgs;
    let tutorial = document.getElementById("tutorial");
    tutorial.style.display = "block";
    typingText();
    window.addEventListener('click', typingText);
}

function typingText() {
    if (TYPE_TIMER !== -1) {
        clearInterval(TYPE_TIMER);
        TYPE_TIMER = -1;

        let noticeText = document.getElementById('noticeText');
        noticeText.innerHTML = CURRENT_MSG[CONTEXT_IDX];

        CONTEXT_IDX++;
    }
    else {
        if (CONTEXT_IDX < CURRENT_MSG.length) {
            let noticeText = document.getElementById('noticeText');
            let idx = 0;
            noticeText.innerHTML = "";
            TYPE_TIMER = setInterval(() => {
                if (idx < CURRENT_MSG[CONTEXT_IDX].length) {
                    noticeText.innerHTML += CURRENT_MSG[CONTEXT_IDX][idx];
                    idx++;
                }
                else {
                    clearInterval(TYPE_TIMER);
                    TYPE_TIMER = -1;
                    CONTEXT_IDX++;
                }
            }, 90);
        }
        else {
            let tutorial = document.getElementById("tutorial");
            tutorial.style.display = "none";
            clearInterval(TYPE_TIMER);
            TYPE_TIMER = -1;
            CONTEXT_IDX = 0;
            window.removeEventListener('click', typingText);
        }
    }
}

console.log("loaded tutorial.js");