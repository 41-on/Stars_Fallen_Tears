const homeScreen = document.getElementById("home-screen");
const culpritScreen = document.getElementById("culprit-screen");
const choiceScreen = document.getElementById("choice-screen");

const startButton = document.getElementById("start-ending");
const backButton = document.getElementById("back-home");
const backToCulpritsButton = document.getElementById("back-to-culprits");

const characterCards = document.querySelectorAll(".character-card");
const selectedCharacterText = document.getElementById("selected-character-text");

function showScreen(screenToShow) {
    homeScreen.hidden = true;
    culpritScreen.hidden = true;
    choiceScreen.hidden = true;

    screenToShow.hidden = false;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
}

// 첫 화면 → 범인 선택
startButton.addEventListener("click", () => {
    showScreen(culpritScreen);
});

// 범인 선택 → 첫 화면
backButton.addEventListener("click", () => {
    showScreen(homeScreen);
});

// 범인 카드 선택
characterCards.forEach((card) => {
    card.addEventListener("click", () => {

        const character = card.dataset.character;

        const characterNames = {
            A: "빌헬름",
            B: "율리안",
            C: "힐데",
            D: "하인리히",
            E: "알베르트",
            F: "에밀"
        };

        selectedCharacterText.textContent =
            characterNames[character];

        showScreen(choiceScreen);
    });
});

// 선택한 인물 화면 → 범인 선택 화면
backToCulpritsButton.addEventListener("click", () => {
    showScreen(culpritScreen);
});
