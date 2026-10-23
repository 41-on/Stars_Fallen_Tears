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
const backToCulpritsButton = document.getElementById("back-to-culprits");
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
const restartButton = document.getElementById("restart-ending");
const goToEpilogueButton = document.getElementById("go-to-epilogue");

const epilogueTitle = document.getElementById("epilogue-title");
const epilogueText = document.getElementById("epilogue-text");
const epilogueCharacterButtons =
    document.querySelectorAll(".epilogue-character");
const finishGameButton = document.getElementById("finish-game");


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

backToCulpritsButton.addEventListener("click", () => {
    showScreen(screens.culprit);
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
            wilhelm: `여기에 알베르트 진엔딩 / 빌헬름 에필로그 원고 입력`,
            julian: `여기에 알베르트 진엔딩 / 율리안 에필로그 원고 입력`,
            hilde: `여기에 알베르트 진엔딩 / 힐데 에필로그 원고 입력`,
            heinrich: `여기에 알베르트 진엔딩 / 하인리히 에필로그 원고 입력`,
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
    epilogueText.textContent = "";

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
        epilogueText.textContent = epilogue;
    });

});


/* ==================================================
   14. 게임 종료
================================================== */

finishGameButton.addEventListener("click", () => {

    endingState.selectedCulprit = null;
    endingState.emilHasItem = null;
    endingState.clueOneRevealed = false;
    endingState.clueTwoRevealed = false;
    endingState.albertRestraintTarget = null;
    endingState.currentEnding = null;

    clueOneInput.checked = false;
    clueTwoInput.checked = false;

    selectedCharacterText.textContent = "";

    epilogueTitle.textContent = "에필로그";
    epilogueText.textContent = "";

    showScreen(screens.home);
});


/* ==================================================
   15. 처음으로 다시 시작
================================================== */

restartButton.addEventListener("click", () => {

    endingState.selectedCulprit = null;
    endingState.emilHasItem = null;
    endingState.clueOneRevealed = false;
    endingState.clueTwoRevealed = false;
    endingState.albertRestraintTarget = null;
    endingState.currentEnding = null;

    clueOneInput.checked = false;
    clueTwoInput.checked = false;

    selectedCharacterText.textContent = "";

    epilogueTitle.textContent = "에필로그";
    epilogueText.textContent = "";

    showScreen(screens.home);
});
