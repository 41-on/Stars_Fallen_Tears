console.log("script.js 실행됨");

/* ==================================================
   1. 화면 요소
================================================== */

const screens = {
    home: document.getElementById("home-screen"),
    culprit: document.getElementById("culprit-screen"),
    item: document.getElementById("item-screen"),
    clue: document.getElementById("clue-screen"),
    restraint: document.getElementById("restraint-screen"),
    ending: document.getElementById("ending-screen"),
    epilogue: document.getElementById("epilogue-screen")
};

const startButton = document.getElementById("start-ending");
const backButton = document.getElementById("back-home");
const characterCards = document.querySelectorAll(".character-card");

const itemYesButton = document.getElementById("item-yes");
const itemNoButton = document.getElementById("item-no");
const backToCulpritsFromItemButton =
    document.getElementById("back-to-culprits-from-item");

const clueOneInput = document.getElementById("clue-one");
const clueTwoInput = document.getElementById("clue-two");
const confirmCluesButton = document.getElementById("confirm-clues");
const backToItemButton = document.getElementById("back-to-item");
const backToCluesButton = document.getElementById("back-to-clues");

const restraintButtons = document.querySelectorAll(".restraint-option");

const endingTitle = document.getElementById("ending-title");
const endingDescription = document.getElementById("ending-description");
const goToEpilogueButton = document.getElementById("go-to-epilogue");

const epilogueTitle = document.getElementById("epilogue-title");
const epilogueText = document.getElementById("epilogue-text");
const epilogueCharacterButtons =
    document.querySelectorAll(".epilogue-character");
const finishGameButton = document.getElementById("finish-game");
const finishEpilogueButton = document.getElementById("finish-epilogue");

/* ==================================================
   3. 선택 결과 저장
================================================== */

const endingState = {
    selectedCulprit: null,
    emilHasItem: null,
    clueOneRevealed: false,
    clueTwoRevealed: false,
    albertRestraintTarget: null,
    currentEnding: null
};


/* ==================================================
   4. 공통 화면 전환
================================================== */

function showScreen(screenToShow) {
    Object.values(screens).forEach((screen) => {
        if (screen) {
            screen.hidden = true;
        }
    });

    screenToShow.hidden = false;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
}


/* ==================================================
   5. 첫 화면과 범인 선택
================================================== */

startButton.addEventListener("click", () => {
    showScreen(screens.culprit);
});

backButton.addEventListener("click", () => {
    showScreen(screens.home);
});

characterCards.forEach((card) => {
    card.addEventListener("click", () => {
        endingState.selectedCulprit = card.dataset.character;

        showScreen(screens.item);
    });
});

/* ==================================================
   6. 선택한 인물 → 아이템 획득 여부
================================================== */

function chooseItem(hasItem) {
    endingState.emilHasItem = hasItem;

    if (endingState.selectedCulprit === "E") {
        if (hasItem) {
            showScreen(screens.clue);
        } else {
            endingState.clueOneRevealed = false;
            endingState.clueTwoRevealed = false;

            resolveEnding();
        }
    } else {
        showScreen(screens.restraint);
    }
}

itemYesButton.addEventListener("click", () => {
    chooseItem(true);
});

itemNoButton.addEventListener("click", () => {
    chooseItem(false);
});

backToCulpritsFromItemButton.addEventListener("click", () => {
    showScreen(screens.culprit);
});


/* ==================================================
   7. 단서 공개 여부
================================================== */

confirmCluesButton.addEventListener("click", () => {
    endingState.clueOneRevealed = clueOneInput.checked;
    endingState.clueTwoRevealed = clueTwoInput.checked;

    resolveEnding();
});

backToItemButton.addEventListener("click", () => {
    showScreen(screens.item);
});

backToCluesButton.addEventListener("click", () => {
    showScreen(screens.item);
});


/* ==================================================
   8. 포박 대상 선택
================================================== */

restraintButtons.forEach((button) => {
    button.addEventListener("click", () => {
        endingState.albertRestraintTarget =
            button.dataset.restraint;

        resolveEnding();
    });
});


/* ==================================================
   9. 엔딩 데이터
================================================== */

const endings = {

    /* ==================================================
       알베르트
    ================================================== */

    albertTrue: {
        title: "진엔딩",
        text: `(진행자는 에밀에게 ‘빌헬름’과 ‘베라’의 편지를 전해주세요.)

             알베르트는 고개를 숙이고 아무 말도 하지 않는다. 그의 옆모습은 얼핏 보면 마치 기도하는 것 같다.
            그걸 바라보는 다른 인물들은 그를 보며 착잡한 표정을 감추지 못 한다. 모두 저마다의 잘못을 떠올리는 걸까? 아니면 그를 동정해서일까?
            얼마 되지 않는 침묵이 지나고, 신고를 받은 독일의 군부 경찰이 다가와 알베르트를 데려간다. 알베르트는 일절 저항하지 않고, 그들의 손길에 따라 자리를 벗어난다.
            그리고 모두는 그런 알베르트의 뒷모습을 끝까지 지켜본다.

             그리고 한참이 지나 알베르트가 점이 되어 사라졌지만, 아무도 입을 열지 않고 있었다. 아직 모두의 마음 속에 일련의 비극이 어둡게 자리하고 있다.
            그런 상황을 견디지 못한 것인지, 에밀이 한층 밝은 목소리로 입을 연다.

            “힐데... 아니 베라 씨라고 해야할까요? 줄게 있어요.”

             베라는 에밀이 부르는 소리에 그를 바라본다. 에밀은 품에서 편지를 하나 꺼내 힐데에게 넘겨준다.

            (에밀을 맡은 플레이어는 베라를 맡은 플레이어에게 베라의 편지를 전달해주세요.)

            “이게 당신에게 온 편지더라고요. 소장님 방에서 편지를 발견했을 때, 난 뭔가 베라라는 사람이 연구소에서 한 자리 하고 있는 대단한 사람일 거라고 생각했는데 말이에요.”
            “베라는 대단한 사람이 맞다네.”

             에밀의 말에 하인리히가 대신 답했다. 그러면서 그는 커다란 자신의 손을 편지를 읽고 있는 베라의 머리 위로 살포시 얹는다.
            하인리히의 따스한 손길에 베라는 깊은 위로를 느끼기 시작했다.

             단지 엄마를 다시 만나고 싶었던 베라는 결국 연구소의 추악한 진실을 파헤치고 엄마의 행방을 밝혀냈다. 편지를 토씨하나까지 전부 읽은 베라는 고개를 들어 하늘을 바라본다.
            아직 날이 저물지 않았지만 저 하늘에 초록별이 빛나는 것만 같다. 베라는 손에 쥔 편지에서 얼핏 온기가 느껴지는 것 같이 느낀다. 그녀의 입가가 파르르 떨린다.

            “...감사합니다.”

             젖은 목소리에 싱긋 웃으며 화답한 에밀은 또 다시 품을 뒤져 편지를 하나 더 꺼낸다.

            “당신에게도 편지가 있어요, 빌헬름씨.”
            “저한테요? … 설마…!”

             생각도 못한 소식에 빌헬름은 당황했다. 하지만 곧 발신인을 직감한 듯 희미하게 목소리가 떨렸다. 그는 에밀이 건네준 편지를 받는다.

            (에밀을 맡은 플레이어는 빌헬름을 맡은 플레이어에게 빌헬름의 편지를 전달해주세요.)

            “감사합니다...”

             편지는 빌헬름의 여동생이 보냈다. 빌헬름은 오랫동안 여동생을 보지 못했지만, 아직도 그녀의 얼굴을 선명히 그려낼 수 있다.
            짧지 않은 시간동안 그는 여동생 리젤의 편지를 여러번 읽는다. 얼룩덜룩한 편지를 보며 그의 눈가가 서서히 촉촉해지기 시작한다.

            “그래서 에밀, 선택했나?”

             빌헬름이 편지를 읽는 사이, 율리안이 에밀에게 말을 걸었다. 에밀은 율리안과 베라를 번갈아 바라본다.

            “네. 결정했습니다.”
            “그래, 뭐 내가 아니어도 돼. 나는 돈만 받으면 되니까.”

             에밀과 율리안은 둘만의 비밀이 있는 것처럼 말한다. 한창의 여운이 가신 베라는 자신을 바라보는 에밀의 시선을 느끼고 호기심이 생긴다.
            하지만, 짓궂은 어른들은 어린 그녀에게 그저 웃음만 지어보일 뿐이다.

            “근데 왜 저를 군부에 넘기지 않았나요, 부소장님?”
            “음? 무슨 말이지? 자네가 뭔가 잘못했던가?”

             하인리히는 모른 척 에밀의 말에 대답했다. 그의 반응을 본 에밀은 잠시 그를 바라보다가 슬며시 미소지었다.
            능청스러운 하인리히의 반응에 다른 이들도 모두 슬쩍 미소짓기 시작한다. 어느덧 그들의 마음 깊이 자리하던 비극은 추억이라는 이름의 화려한 물감으로 뒤얽혀 새로운 그림이 된다.`,
        epilogue: {
            wilhelm: ` 빌헬름은 리젤의 편지를 보고 그대로 집으로 달려갔다. 얼마 전, 그는 아픈 동생을 내버려두고 홀로 연구소로 들어왔다.
            부모를 일찍 잃은 동생이 의지할 곳은 자신 뿐이라는 부담감 때문이었다.
            
             하지만 소장이 살해되는 일련의 사건을 겪으며, 그리고 보호자를 잃은 힐데의 아픔을 직면하며 빌헬름은 자신의 선택을 후회할 수밖에 없었다.
            빌헬름은 자신이 잘못되기라도 한다면, 자신의 빈자리가 동생에게 깊은 상처를 남길 것이라는 것을 드디어 깨닫게 되었다.
            
             빌헬름은 아마 리젤이 어른이 될 때까지, 리젤을 혼자 두지 않을 것이다. 또한 자신의 몸도 소중히 할 것이다.
            그리고 더 나아가 리젤의 추억 속에 자신의 얼굴을 빠짐없이 비춰줄 것이다.
            
             그것이야말로 동생에게 정말로 필요한 것이니까.
            
             빌헬름은 먼 길을 달려오느라 옷 매무새가 흐트러지고 얼굴도, 머리도 엉망이었다. 하지만 차마 그는 그런 걸 신경쓸 수 없었다.
            이 미안한 감정을 어서 전하고, 너무 일찍 어른스러워진 동생의 마음을 보듬어주는 것이 급했기 때문이다.
            
             그리고 마침내 집에 도착한 빌헬름은 그렇게 그리고 그리던 동생의 얼굴을 마주했다.
            적지 않은 기간동안 마주하지 못했기에, 이미 많이 자라난 동생의 모습을 보며 빌헬름은 자신도 모르게 눈물이 새어나왔다.
            생각지도 못한 얼굴을 마주한 리젤의 눈이 잠시 커다래졌다 이내 완만한 곡선을 띠었다. 그 끝에는 작은 물방울이 맺혀있었다.
            
             두 남매는 이내 서로에게 달려갔다. 그리고 그때가 되어서야 빌헬름은 드디어 동생을 지키지 못했던 책임으로부터 자유로워졌다.`,
            julian: `(에밀에게 율리안이 선택받지 못 한 경우)
    
             에밀에게 선택받지 못한 율리안은 연구소를 벗어나 다른 나라로 떠났다. 그는 더 이상 선택받은 인류라는 허상을 쫓지 않기로 선택했다.
            그의 족쇄의 원흉은 결국 혈통을 향한 자신의 집착이었기 때문이다. 율리안은 드디어 자신의 혈통, 피의 족쇄로부터 자유로워졌다.
            
             율리안이 독일을 떠나 정착하자, 주소를 어떻게 알았는지 에밀이 그의 집으로 수많은 금괴가 담긴 가방을 보내왔다.
            율리안은 가방을 열자마자 보이는 눈부신 황금들을 보고 기쁨을 감추지 못했다. 하지만 남들처럼 그 금을 쉽게 돈으로 바꾸거나 탕진하지 않았다.
            
             아마 율리안은 앞으로 현명하게 그 돈을 사용할 것이다.
             
            (에밀에게 율리안이 선택받은 경우)
            
             에밀에게 선택받은 율리안은 그대로 에밀을 따라 영국으로 귀향했다. 입국 직후, 그는 비밀리에 영국의 높은 직급으로 보이는 이들에게 불려가 구금된 채 몇 가지 심문을 받았다.
            하지만 율리안은 그들의 법에 반하는 일을 직접 수행하거나 관련되지 않은 것으로 보여 금방 풀려났다.
            
             연구소에서 일련의 사건을 겪은 율리안은 더 이상 선택받은 인류라는 허상을 쫓지 않기로 선택했다.
            그의 족쇄의 원흉은 결국 혈통을 향한 자신의 집착이었기 때문이다. 율리안은 드디어 자신의 혈통, 피의 족쇄로부터 자유로워졌다.
            
             에밀이 어떻게 손을 썼는지, 율리안은 영국에서 정착할 집과 재산을 얻게 되었다. 아마 연구소에서의 도움 덕분일 것이다.
            율리안은 집 문을 열자마자 보이는 눈부신 황금들을 보고 기쁨을 감추지 못했다. 하지만 남들처럼 그 금을 쉽게 돈으로 바꾸거나 탕진하지 않았다.
            
             아마 율리안은 앞으로 현명하게 그 돈을 사용할 것이다.`,
            hilde: `여기에 알베르트 진엔딩 / 힐데 에필로그 원고 입력`,
            heinrich: `(에밀에게 힐데가 선택받은 경우)
            
             하지만 하인리히는 그 편지를 보고도 연구소에 남았다. 자신의 마지막 책임을 다하기 위해서였다.
            스텔라를 향한 죄책감으로부터 자유롭지 않았다. 심지어 그는 이번 사건을 겪고 유대인을 학살한 것에도 죄책감을 느끼게 됐다.

            유대인을 사랑하고 유대인 아이를 마음에 품은 독일인, 하인리히.
            그는 ‘스텔라’ 작전이 있기 전날 밤, 에밀과 협력하여 그는 격리동에 모여있던 유대인들을 모두 몰래 풀어주었다. 사고로 위장하기 위함이었다.

            ‘스텔라’ 작전 당일, 제7 연구소 상공에 전투기 무리의 그림자가 나타났다. 하인리히는 전투기를 발견하고 그대로 ‘노크룸’으로 향했다.

            하인리히는 자신이 만든 아이와 함께 단 둘이 연구소에 남았다. 그리고 가만히 폭격이 떨어지길 기다렸다.
            하인리히는 드디어 자신의 그릇된 신념으로 만들어진 뒤틀린 결과물을 청산하고 자유로워졌다.

곧 연구소의 하늘에서 마치 유성우가 내리듯 폭격이 떨어졌다. 하인리히는 별이 내린 눈물을 받아냈고, 마침내 사랑하는 그녀를 만나러 떠나갔다.`,
            albert: `여기에 알베르트 진엔딩 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 알베르트 진엔딩 / 에밀 에필로그 원고 입력`
        }
    },

    albertNormal: {
        title: "엔딩",
        text: `여기에 알베르트 일반 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 알베르트 일반 엔딩 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 알베르트 일반 엔딩 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 알베르트 일반 엔딩 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 알베르트 일반 엔딩 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 알베르트 일반 엔딩 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 알베르트 일반 엔딩 / 에밀 에필로그 원고 입력`
        }
    },


    /* ==================================================
       빌헬름
    ================================================== */

    wilhelmItemJulian: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    wilhelmItemHilde: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    wilhelmItemNone: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },

    wilhelmNoItemJulian: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    wilhelmNoItemHilde: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    wilhelmNoItemNone: {
        title: "엔딩",
        text: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 빌헬름 / 아이템 미획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },


    /* ==================================================
       율리안
    ================================================== */

    julianItemJulian: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    julianItemHilde: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    julianItemNone: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },

    julianNoItemJulian: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 미획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    julianNoItemHilde: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 미획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    julianNoItemNone: {
        title: "엔딩",
        text: `여기에 율리안 / 아이템 미획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 율리안 / 아이템 미획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },


    /* ==================================================
       힐데
    ================================================== */

    hildeItemJulian: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    hildeItemHilde: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    hildeItemNone: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },

    hildeNoItemJulian: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 미획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    hildeNoItemHilde: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 미획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    hildeNoItemNone: {
        title: "엔딩",
        text: `여기에 힐데 / 아이템 미획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 힐데 / 아이템 미획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },


    /* ==================================================
       하인리히
    ================================================== */

    heinrichItemJulian: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    heinrichItemHilde: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    heinrichItemNone: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },

    heinrichNoItemJulian: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 미획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    heinrichNoItemHilde: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 미획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    heinrichNoItemNone: {
        title: "엔딩",
        text: `여기에 하인리히 / 아이템 미획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 하인리히 / 아이템 미획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },


    /* ==================================================
       에밀
    ================================================== */

    emilItemJulian: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    emilItemHilde: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    emilItemNone: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    },

    emilNoItemJulian: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 미획득 / 율리안 포박 / 에밀 에필로그 원고 입력`
        }
    },

    emilNoItemHilde: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 미획득 / 힐데 포박 / 에밀 에필로그 원고 입력`
        }
    },

    emilNoItemNone: {
        title: "엔딩",
        text: `여기에 에밀 / 아이템 미획득 / 포박 없음 엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 하인리히 에필로그 원고 입력`,
            albert: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 알베르트 에필로그 원고 입력`,
            emil: `여기에 에밀 / 아이템 미획득 / 포박 없음 / 에밀 에필로그 원고 입력`
        }
    }
};


/* ==================================================
   10. 엔딩 판정
================================================== */

function resolveEnding() {
    const culprit = endingState.selectedCulprit;
    const hasItem = endingState.emilHasItem;
    const restraint = endingState.albertRestraintTarget;

    const hasBothClues =
        endingState.clueOneRevealed &&
        endingState.clueTwoRevealed;


    /* ----------------------------------------------
       알베르트
    ---------------------------------------------- */

    if (culprit === "E") {

        if (hasItem === true && hasBothClues) {
            showEnding(endings.albertTrue);
            return;
        }

        showEnding(endings.albertNormal);
        return;
    }


    /* ----------------------------------------------
       빌헬름
    ---------------------------------------------- */

    if (culprit === "A") {

        if (hasItem === true && restraint === "julian") {
            showEnding(endings.wilhelmItemJulian);
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(endings.wilhelmItemHilde);
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(endings.wilhelmItemNone);
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(endings.wilhelmNoItemJulian);
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(endings.wilhelmNoItemHilde);
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(endings.wilhelmNoItemNone);
            return;
        }
    }


    /* ----------------------------------------------
       율리안
    ---------------------------------------------- */

    if (culprit === "B") {

        if (hasItem === true && restraint === "julian") {
            showEnding(endings.julianItemJulian);
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(endings.julianItemHilde);
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(endings.julianItemNone);
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(endings.julianNoItemJulian);
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(endings.julianNoItemHilde);
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(endings.julianNoItemNone);
            return;
        }
    }


    /* ----------------------------------------------
       힐데
    ---------------------------------------------- */

    if (culprit === "C") {

        if (hasItem === true && restraint === "julian") {
            showEnding(endings.hildeItemJulian);
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(endings.hildeItemHilde);
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(endings.hildeItemNone);
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(endings.hildeNoItemJulian);
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(endings.hildeNoItemHilde);
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(endings.hildeNoItemNone);
            return;
        }
    }


    /* ----------------------------------------------
       하인리히
    ---------------------------------------------- */

    if (culprit === "D") {

        if (hasItem === true && restraint === "julian") {
            showEnding(endings.heinrichItemJulian);
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(endings.heinrichItemHilde);
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(endings.heinrichItemNone);
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(endings.heinrichNoItemJulian);
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(endings.heinrichNoItemHilde);
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(endings.heinrichNoItemNone);
            return;
        }
    }


    /* ----------------------------------------------
       에밀
    ---------------------------------------------- */

    if (culprit === "F") {

        if (hasItem === true && restraint === "julian") {
            showEnding(endings.emilItemJulian);
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(endings.emilItemHilde);
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(endings.emilItemNone);
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(endings.emilNoItemJulian);
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(endings.emilNoItemHilde);
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(endings.emilNoItemNone);
            return;
        }
    }
}


/* ==================================================
   11. 엔딩 화면
================================================== */

function showEnding(ending) {
    endingState.currentEnding = ending;

    endingTitle.textContent = ending.title;
    endingDescription.textContent = ending.text;

    showScreen(screens.ending);
}


/* ==================================================
   12. 에필로그 화면
================================================== */

goToEpilogueButton.addEventListener("click", () => {

    if (!endingState.currentEnding) {
        return;
    }

    epilogueTitle.textContent = "에필로그";
epilogueText.classList.remove("epilogue-open");
epilogueText.innerHTML = '<p id="epilogue-guide">에필로그를 확인하고 싶은 인물을 선택하세요. 순서대로 보는 것을 추천합니다.</p>';

    showScreen(screens.epilogue);
});


/* ==================================================
   13. 에필로그 인물 선택
================================================== */

epilogueCharacterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const character = button.dataset.character;
        const currentEnding = endingState.currentEnding;

        if (!currentEnding) {
            return;
        }

        const epilogue = currentEnding.epilogue[character];

        if (!epilogue) {
            return;
        }

        epilogueTitle.textContent = button.textContent;
epilogueText.style.textAlign = "left";
epilogueText.style.whiteSpace = "pre-line";
epilogueText.textContent = epilogue;
    });

});

/* ==================================================
   14. 게임 종료
================================================== */

function returnToHome() {
    endingState.selectedCulprit = null;
    endingState.emilHasItem = null;
    endingState.clueOneRevealed = false;
    endingState.clueTwoRevealed = false;
    endingState.albertRestraintTarget = null;
    endingState.currentEnding = null;

    if (clueOneInput) clueOneInput.checked = false;
    if (clueTwoInput) clueTwoInput.checked = false;

    epilogueTitle.textContent = "에필로그";
epilogueText.style.textAlign = "center";
epilogueText.style.whiteSpace = "normal";
epilogueText.textContent = "에필로그를 확인하고 싶은 인물을 선택하세요.";

    showScreen(screens.home);
}

finishGameButton.addEventListener("click", returnToHome);
finishEpilogueButton.addEventListener("click", returnToHome);
