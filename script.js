let interval = 30;
let totalRounds = 10;

let timeRemaining;
let currentRound;
let timerId = null;
let running = false;

// Elements
const settingsScreen = document.getElementById("settingsScreen");
const timerScreen = document.getElementById("timerScreen");

const sessionSelect = document.getElementById("sessionSelect");
const roundsSelect = document.getElementById("roundsSelect");

const timerEl = document.getElementById("timer");
const roundEl = document.getElementById("round");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

function populateSelectors() {
  // Session length: 5s → 300s (increments of 5)
  for (let i = 5; i <= 300; i += 5) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} seconds`;
    if (i === 30) option.selected = true;
    sessionSelect.appendChild(option);
  }

  // Rounds: 1 → 15
  for (let i = 1; i <= 15; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === 10) option.selected = true;
    roundsSelect.appendChild(option);
  }
}

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
  interval = parseInt(sessionSelect.value, 10);
  totalRounds = parseInt(roundsSelect.value, 10);

  timeRemaining = interval;
  currentRound = 1;

  updateUI();
  startTimer();
});

stopButton.addEventListener("click", stopTimer);
populateSelectors();
