// Screens
const setupScreen = document.getElementById("setupScreen");
const timerScreen = document.getElementById("timerScreen");

// Selectors
const minutesSelect = document.getElementById("minutesSelect");
const secondsSelect = document.getElementById("secondsSelect");
const roundsSelect = document.getElementById("roundsSelect");
const displayModeSelect = document.getElementById("displayModeSelect");

// Buttons
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

// Displays
const numberDisplay = document.getElementById("numberDisplay");
const radialContainer = document.getElementById("radialContainer");
const radialProgress = document.getElementById("radialProgress");
const timeDisplay = document.getElementById("timeDisplay");
const roundDisplay = document.getElementById("roundDisplay");

// Timer state
let interval = 30;
let totalRounds = 10;
let currentRound = 1;
let timeRemaining = interval;
let timerId = null;
let running = false;

/* -----------------------------
   Populate selectors
------------------------------ */
function populateSelectors() {
  // Minutes: 0 → 10
  for (let i = 0; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, "0");
    if (i === 0) option.selected = true;
    minutesSelect.appendChild(option);
  }

  // Seconds: 0 → 55 (increments of 5)
  for (let i = 0; i < 60; i += 5) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, "0");
    if (i === 30) option.selected = true;
    secondsSelect.appendChild(option);
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

/* -----------------------------
   Screen helpers
------------------------------ */
function showTimerScreen() {
  setupScreen.classList.add("hidden");
  timerScreen.classList.remove("hidden");
}

function showSetupScreen() {
  timerScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
}

/* -----------------------------
   Timer logic
------------------------------ */
function startTimer() {
  if (running) return;

  const minutes = parseInt(minutesSelect.value, 10);
  const seconds = parseInt(secondsSelect.value, 10);

  interval = minutes * 60 + seconds;
  totalRounds = parseInt(roundsSelect.value, 10);

  if (interval <= 0) return;

  timeRemaining = interval;
  currentRound = 1;
  running = true;

  showTimerScreen();
  updateUI();

  timerId = setInterval(() => {
    timeRemaining--;

    if (timeRemaining <= 0) {
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
  showSetupScreen();
}

/* -----------------------------
   UI updates
------------------------------ */
function updateUI() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  roundDisplay.textContent = `Round ${currentRound} of ${totalRounds}`;

  const isFinalSeconds = timeRemaining <= 3;

  // Color change for last 3 seconds
  const colorClass = isFinalSeconds ? "text-error" : "text-primary";
  numberDisplay.className = `text-6xl font-bold ${colorClass}`;
  radialProgress.className = `radial-progress ${colorClass}`;

  if (displayModeSelect.value === "number") {
    numberDisplay.textContent = timeText;
    numberDisplay.classList.remove("hidden");
    radialContainer.classList.add("hidden");
  } else {
    const progress = (timeRemaining / interval) * 100;
    radialProgress.style.setProperty("--value", progress.toFixed(0));
    timeDisplay.textContent = timeText;

    radialContainer.classList.remove("hidden");
    numberDisplay.classList.add("hidden");
  }
}

/* -----------------------------
   Events
------------------------------ */
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

// Init
populateSelectors();
