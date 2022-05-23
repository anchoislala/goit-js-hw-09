const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const changeColor = {
    changeColorInterval: null,
    start() {
        startBtn.disabled = true;

        if (startBtn.disabled) {
            stopBtn.disabled = false;
        }

        this.changeColorInterval = setInterval(() => {
            body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },
    stop() {
        clearInterval(this.changeColorInterval);
        stopBtn.disabled = true;
        startBtn.disabled = false;
    }
};

startBtn.addEventListener("click", () => {
    changeColor.start();
});

stopBtn.addEventListener("click", () => {
    changeColor.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

