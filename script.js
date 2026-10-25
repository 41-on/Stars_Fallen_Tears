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
   2. 인물 이름
================================================== */

const characterNames = {
    A: "빌헬름",
    B: "율리안",
    C: "힐데",
    D: "하인리히",
    E: "알베르트",
    F: "에밀"
};


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
        text: `여기에 알베르트 진엔딩 원고 입력`,
        epilogue: {
            wilhelm: `여기에 알베르트 진엔딩 / 빌헬름 생존
            
            리젤의 편지를 본 **빌헬름**은 그대로 집으로 달려갔다. 그는 아픈 동생을 홀로 내버려두고 연구소로 향했다.
            소장이 살해되는 사건을 겪고, 그 안에서 힐데의 아픔을 직면하면서 그는 잘못된 자신의 선택을 후회했다.
            자신이 죽으면 동생은 깊은 슬픔에 잠길 것이라는 걸 드디어 깨달은 것이다.
            
            빌헬름은 아마 리젤이 어른이 될 때까지, 그녀를 혼자 두지 않을 것이다. 또한 자신의 몸도 소중히 할 것이다.
            그것이야말로 동생을 정말 위하는 것이니까.
            
            그는 드디어 동생을 지키지 못했던 책임으로부터 자유로워졌다.`,
            julian: `여기에 알베르트 진엔딩 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 알베르트 진엔딩 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 알베르트 진엔딩 / 하지만 **하인리히**는 그 편지를 보고도 연구소에 남았다. 자신의 마지막 책임을 다하기 위해서였다.
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
epilogueText.innerHTML = '<p id="epilogue-guide">에필로그를 확인하고 싶은 인물을 선택하세요.</p>';

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
      epilogueText.classList.add("epilogue-open");
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
    epilogueText.textContent = "";

    showScreen(screens.home);
}

finishGameButton.addEventListener("click", returnToHome);
finishEpilogueButton.addEventListener("click", returnToHome);
