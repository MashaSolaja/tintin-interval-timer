let interval = 30;
let totalRounds = 10;

let timeRemaining;
let currentRound;
let timerId = null;
let running = false;

// Elements
const settingsScreen = document.getElementById("settingsScreen");
const timerScreen = document.getElementById("timerScreen");

const sessionInput = document.getElementById("sessionInput");
const roundsInput = document.getElementById("roundsInput");

const timerEl = document.getElementById("timer");
const roundEl = document.getElementById("round");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

// UI helpers
function showTimerScreen() {
  settingsScreen.classList.add("hidden");
  timerScreen.classList.remove("hidden");
}

function showSettingsScreen() {
  timerScreen.classList.add("hidden");
  settingsScreen.classList.remove("hidden");
}

// Timer logic
function updateUI() {
  timerEl.textContent = timeRemaining;
  roundEl.textContent = `Round ${currentRound} of ${totalRounds}`;
}

function startTimer() {
  running = true;
  showTimerScreen();

  timerId = setInterval(() => {
    timeRemaining--;

    if (timeRemaining === 0) {
      currentRound++;
      if (currentRound > totalRounds) {
        stopTimer();
        return;
      }
      timeRemaining = interval;
    }

    updateUI();
  }, 1000);
}

function stopTimer() {
  running = false;
  clearInterval(timerId);
  timerId = null;
  showSettingsScreen();
}

// Event handlers
startButton.addEventListener("click", () => {
  interval = parseInt(sessionInput.value, 10);
  totalRounds = parseInt(roundsInput.value, 10);

  timeRemaining = interval;
  currentRound = 1;

  updateUI();
  startTimer();
});

stopButton.addEventListener("click", stopTimer);
