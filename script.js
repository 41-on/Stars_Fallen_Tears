
const homeScreen = document.getElementById("home-screen");
const culpritScreen = document.getElementById("culprit-screen");

const startButton = document.getElementById("start-ending");
const backButton = document.getElementById("back-home");
const characterCards = document.querySelectorAll(".character-card");

// 첫 화면에서 범인 선택 화면으로 이동
startButton.addEventListener("click", () => {
    homeScreen.hidden = true;
    culpritScreen.hidden = false;
    window.scrollTo(0, 0);
});

// 범인 선택 화면에서 첫 화면으로 돌아가기
backButton.addEventListener("click", () => {
    culpritScreen.hidden = true;
    homeScreen.hidden = false;
    window.scrollTo(0, 0);
});

// 아직 실제 분기 화면은 연결하지 않고,
// 어떤 인물 카드를 눌렀는지만 확인
characterCards.forEach((card) => {
    card.addEventListener("click", () => {
        const character = card.dataset.character;
        alert(`인물 ${character}을(를) 선택했습니다. 다음 단계에서 분기 화면을 연결합니다.`);
    });
});
