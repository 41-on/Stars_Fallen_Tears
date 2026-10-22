
const homeScreen = document.getElementById("home-screen");
const culpritScreen = document.getElementById("culprit-screen");

const startButton = document.getElementById("start-ending");
const backButton = document.getElementById("back-home");
const characterCards = document.querySelectorAll(".character-card");

function showScreen(screenToShow) {
    homeScreen.hidden = true;
    culpritScreen.hidden = true;

    screenToShow.hidden = false;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

startButton.addEventListener("click", () => {
    showScreen(culpritScreen);
});

backButton.addEventListener("click", () => {
    showScreen(homeScreen);
});

characterCards.forEach((card) => {
    card.addEventListener("click", () => {
        const character = card.dataset.character;
        alert(`인물 ${character}을(를) 선택했습니다. 다음 단계에서 분기 화면을 연결합니다.`);
    });
});
