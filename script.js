// https://2dtgyz.csb.app/

// HTML Elements
const TIMER_DISPLAY = document.getElementById("timer_display");
const PROGRESS = document.getElementById("progress");
const START = document.getElementById("start");
const RESET = document.getElementById("reset");
const QUOTE = document.getElementById("quote");
const QUOTE_DISPLAY = document.getElementById("quote_display");

// Constants
const ONE_SECOND_IN_MS = 1000;
const INITIAL_TIME = 15;
const TIMER_IS_UP_TEXT = "Time is up!";
const STOP_TEXT = "Stop";
const START_TEXT = "Start";
const QUOTE_API = "https://api.quotable.io/random?tags=inspirational";

// Variables
let timer;
let secondsLeft = INITIAL_TIME;

// Function: Fetch quotes from QUOTE API
function fetchQuote() {
    fetch(QUOTE_API)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            QUOTE_DISPLAY.innerText = `${data.content} - ${data.author}`;
        })
        .catch(error => console.log('ERROR', error))
}


// Function: 잔여 시간을 보여주는 함수
function updateDisplay() {
    let minutes = Math.floor(secondsLeft / 60);     // floor after division
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = secondsLeft % 60;                 // modulus
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    TIMER_DISPLAY.innerText = minutes + ":" + seconds;
}


// Function: Turns timer on/off
function toggleTimer() {
    if (timer) {
        stopTimer();
    } else {
        startTimer();
    }
}

// Function: secondsLeft 초기화
function resetTimer() {
    secondsLeft = INITIAL_TIME;
    PROGRESS.max = 15;
    PROGRESS.value = 0;
    stopTimer();
    updateDisplay();
}

// Function: 타이머 멈추고 초기화
function stopTimer() {
    clearInterval(timer);
    timer = null;
    START.innerText = START_TEXT;
}

function startTimer() {
    PROGRESS.max = 15;
    PROGRESS.value = 0;
    timer = setInterval(() => {
        secondsLeft--;
        PROGRESS.value++;
        updateDisplay();
        if (secondsLeft === 0) {
            resetTimer();
            alert(TIMER_IS_UP_TEXT);
        }
    }, ONE_SECOND_IN_MS)
    START.innerText = STOP_TEXT;
}

updateDisplay();
fetchQuote();

START.addEventListener("click", toggleTimer);
RESET.addEventListener("click", resetTimer);
QUOTE.addEventListener("click", fetchQuote);