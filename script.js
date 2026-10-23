console.log("script.js 실행됨");

/* ==================================================
   1. 화면 요소
================================================== */

const screens = {
    home: document.getElementById("home-screen"),
    culprit: document.getElementById("culprit-screen"),
    choice: document.getElementById("choice-screen"),
    item: document.getElementById("item-screen"),
    clue: document.getElementById("clue-screen"),
    restraint: document.getElementById("restraint-screen"),
    ending: document.getElementById("ending-screen")
};

const startButton = document.getElementById("start-ending");
const backButton = document.getElementById("back-home");
const backToCulpritsButton = document.getElementById("back-to-culprits");

const characterCards = document.querySelectorAll(".character-card");
const selectedCharacterText = document.getElementById(
    "selected-character-text"
);

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


/* ==================================================
   2. 선택 결과 저장
================================================== */

const characterNames = {
    A: "빌헬름",
    B: "율리안",
    C: "힐데",
    D: "하인리히",
    E: "알베르트",
    F: "에밀"
};

const endingState = {
    selectedCulprit: null,
    emilHasItem: null,
    clueOneRevealed: false,
    clueTwoRevealed: false,
    albertRestraintTarget: null
};


/* ==================================================
   3. 공통 화면 전환
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
   4. 첫 화면과 범인 선택
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

        // 범인을 선택하면 바로 아이템 분기로 이동
        showScreen(screens.item);
    });
});

backToCulpritsButton.addEventListener("click", () => {
    showScreen(screens.culprit);
});


/* ==================================================
   5. 선택한 인물 → 아이템 획득 여부
================================================== */

document.getElementById("back-to-culprits").addEventListener(
    "click",
    () => showScreen(screens.culprit)
);

function chooseItem(hasItem) {
    endingState.emilHasItem = hasItem;

    if (endingState.selectedCulprit === "E") {
        if (hasItem) {
            // 알베르트가 진범이고 아이템도 획득한 경우에만
            // 단서 공개 여부를 확인한다.
            showScreen(screens.clue);
        } else {
            // 아이템 미획득이면 진엔딩 불가
            // 단서 공개 페이지를 건너뛴다.
            endingState.clueOneRevealed = false;
            endingState.clueTwoRevealed = false;
            resolveEnding();
        }
    } else {
        // 다른 인물이 진범이면 포박 상황 확인
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
   6. 단서 공개 여부 → 다음 분기
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
   7. 포박 대상 선택
================================================== */

restraintButtons.forEach((button) => {
    button.addEventListener("click", () => {
        endingState.albertRestraintTarget =
            button.dataset.restraint;

        resolveEnding();
    });
});


/* ==================================================
   8. 엔딩 판정
================================================== */

function resolveEnding() {
    const culprit = endingState.selectedCulprit;
    const hasItem = endingState.emilHasItem;
    const restraint = endingState.albertRestraintTarget;

    const hasBothClues =
        endingState.clueOneRevealed &&
        endingState.clueTwoRevealed;


    // ==================================================
    // 알베르트
    // ==================================================

    if (culprit === "E") {

        // 알베르트 진엔딩
        if (hasItem === true && hasBothClues) {
            showEnding(
                "진엔딩",
                `여기에 알베르트 진엔딩 원고 입력`
            );
            return;
        }

        // 알베르트 일반 엔딩
        showEnding(
            "엔딩",
            `여기에 알베르트 일반 엔딩 원고 입력`
        );
        return;
    }


    // ==================================================
    // 빌헬름
    // ==================================================

    if (culprit === "A") {

        if (hasItem === true && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 빌헬름 / 아이템 미획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }
    }


    // ==================================================
    // 율리안
    // ==================================================

    if (culprit === "B") {

        if (hasItem === true && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 율리안 / 아이템 미획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }
    }


    // ==================================================
    // 힐데
    // ==================================================

    if (culprit === "C") {

        if (hasItem === true && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 힐데 / 아이템 미획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }
    }


    // ==================================================
    // 하인리히
    // ==================================================

    if (culprit === "D") {

        if (hasItem === true && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 하인리히 / 아이템 미획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }
    }


    // ==================================================
    // 에밀
    // ==================================================

    if (culprit === "F") {

        if (hasItem === true && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === true && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "julian") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 미획득 / 율리안 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "hilde") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 미획득 / 힐데 포박 엔딩 원고 입력`
            );
            return;
        }

        if (hasItem === false && restraint === "none") {
            showEnding(
                "엔딩",
                `여기에 에밀 / 아이템 미획득 / 미포박 엔딩 원고 입력`
            );
            return;
        }
    }
}

function showEnding(title, description) {
    endingTitle.textContent = title;
    endingDescription.textContent = description;
    showScreen(screens.ending);
}


/* ==================================================
   9. 처음부터 다시 시작
================================================== */

restartButton.addEventListener("click", () => {
    endingState.selectedCulprit = null;
    endingState.emilHasItem = null;
    endingState.clueOneRevealed = false;
    endingState.clueTwoRevealed = false;
    endingState.albertRestraintTarget = null;

    clueOneInput.checked = false;
    clueTwoInput.checked = false;
    selectedCharacterText.textContent = "";

    showScreen(screens.home);
});
