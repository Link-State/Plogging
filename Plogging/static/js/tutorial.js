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

    console.log("loaded tutorial window");

    if (TUTORIAL === null) {
        TUTORIAL = {
            "EnterEntry":true,
            "slot4":"guide",
            "openBoardBtn":"plogging",
            "openMailBoxBtn":"readMail",
            "openShopBtn":"shop"
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

    if (TUTORIAL["EnterEntry"] !== undefined) {
        msgs = [
            '"멍멍!"',
            "학교 공터에 강아지가 나타났습니다!",
            "아무래도 학교 공터 주변을 보금자리로 자리잡은 것 같네요.",
            "강아지가 자신에게 와달라는 눈빛을 보내고 있어요.",
            "얼른 강아지에게 다가가봅시다. (강아지를 클릭하세요.)"
        ];
        Guide(msgs);
        delete TUTORIAL['EnterEntry'];
        localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
    }

    if (TUTORIAL["slot4"] === undefined) {
        let menu = document.getElementById("menu");
        menu.style.display = "block";
    }
}

function isTutorial(e) {
    let id = e.target.id !== '' ? e.target.id : e.target.className;
    let remainTutorial = Object.keys(TUTORIAL).length;

    if (remainTutorial <= 0) {
        window.removeEventListener('click', isTutorial);
    }
    else {
        if (TUTORIAL[id] !== undefined) {
            let speaker = document.getElementById('speaker');
            speaker.style.backgroundImage = "url(" + PATH + "/static/image/dog_sit.png)";
        }

        if (TUTORIAL[id] === "guide") {
            msgs = [
                "안녕하세요 멍멍!",
                "아.. 뭘 하고 있었냐구요??",
                "'플로깅'이요! 이거 하면 저기 앞에 슈퍼 사장님께서 제가 좋아하는 뼈다귀를 주세요.",
                "아... 쳐다본 이유요..? 그 쪽 손에.. 맛있는게 있어서.... (침을 줄줄 흘리고 있다.)",
                "저기, 그렇게 있지 말고 그 쪽도 플로깅해서 저랑 같이 뼈다귀 먹는게 어떠세요?? 이거도 맛있는데!",
                "'플로깅'하는법 그렇게 어렵지 않아요, 제가 도와드릴께요!",
                "(메뉴를 눌러보자)"
            ];
            Guide(msgs);
            delete TUTORIAL[id];
            localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
            let menu = document.getElementById("menu");
            menu.style.display = "block";
        }
        else if (TUTORIAL[id] === "plogging") {
            msgs = [
                "여기는 플로깅을 모집하고 직접 참여하는 공간이에요.",
                "이 곳을 통해 플로깅에 참여하면 학교를 꾸미는데 필요한 '플라스틱'을 얻을 수 있어요.",
                "플로깅 모집에 주의사항이 있다면 (1) 최소 1시간 이후부터 모집 가능하다는 점, (2) 플로깅 시작 1시간 전에는 참가/참가취소가 불가능하다는 점이에요.",
                "또, 게시글을 읽다가 작성자에게 질문/건의 사항이 생긴다면 해당 작성자의 이름을 누르면 메일을 보낼 수 있어요!",
                "이제 플로깅을 통해 플라스틱을 수집해봐요!"
            ];
            Guide(msgs);
            delete TUTORIAL[id];
            localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
        }
        else if (TUTORIAL[id] === "readMail") {
            msgs = [
                "메일을 읽고 답장은 어떻게 보내야 할까요?",
                "보낸 사람의 이름을 클릭하면 답장 메일을 작성할 수 있답니다.",
                "근데... 저는 강아지라서... 글이 개발새발 써지네요.."
            ];
            Guide(msgs);
            delete TUTORIAL[id];
            localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
        }
        else if (TUTORIAL[id] === "shop") {
            msgs = [
                "여기는 상점이에요. 플로깅을 통해 모은 플라스틱으로 학교를 꾸미는데 필요한 아이템들을 살 수 있어요.",
                "지금은.... 물건이 2개밖에 없네요. 아직 입점한지 얼마 안되서 그런가봐요.",
                "혹시 모르지 않을까요? 나중에는 더 많은 것들이 생길지도요!"
            ];
            Guide(msgs);
            delete TUTORIAL[id];
            localStorage.setItem("tutorial", JSON.stringify(TUTORIAL));
        }
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

function lineChange() {

}

console.log("loaded tutorial.js");