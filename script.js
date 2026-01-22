let interval = 30;
let totalRounds = 10;

let timeRemaining;
let currentRound;
let timerId = null;
let running = false;

// Elements
const settingsScreen = document.getElementById("settingsScreen");
const timerScreen = document.getElementById("timerScreen");

const minutesSelect = document.getElementById("minutesSelect");
const secondsSelect = document.getElementById("secondsSelect");
const roundsSelect = document.getElementById("roundsSelect");

const timerEl = document.getElementById("timer");
const roundEl = document.getElementById("round");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

function populateTimeSelectors() {
  // Minutes: 0 → 10
  for (let m = 0; m <= 10; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m.toString().padStart(2, "0");
    if (m === 0) option.selected = true;
    minutesSelect.appendChild(option);
  }

  // Seconds: 0 → 55 (increments of 5)
  for (let s = 0; s < 60; s += 5) {
    const option = document.createElement("option");
    option.value = s;
    option.textContent = s.toString().padStart(2, "0");
    if (s === 30) option.selected = true;
    secondsSelect.appendChild(option);
  }
}

function populateRoundsSelector() {
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
  // Get minutes and seconds from the new selectors
  const minutes = parseInt(minutesSelect.value, 10);
  const seconds = parseInt(secondsSelect.value, 10);

  // Combine into total seconds for the timer
  interval = minutes * 60 + seconds;

  // Safety check
  if (interval === 0) {
    alert("Please select a session length.");
    return;
  }

  // Get rounds from rounds selector
  totalRounds = parseInt(roundsSelect.value, 10);

  // Initialize timer
  timeRemaining = interval;
  currentRound = 1;

  // Update UI and start
  updateUI();
  startTimer();
});

stopButton.addEventListener("click", stopTimer);
populateTimeSelectors();
populateRoundsSelector();
