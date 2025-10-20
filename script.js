let startTime, updatedTime, difference = 0, tInterval;
let running = false;
const timeDisplay = document.getElementById('time');
const totalTimeDisplay = document.getElementById('totalTime');
const progressFill = document.getElementById('progressFill');
const goalStatus = document.getElementById('goalStatus');
const quoteText = document.getElementById('quote');

const quotes = [
  "Discipline beats motivation.",
  "Small steps every day lead to big success.",
  "Focus on progress, not perfection.",
  "Don’t count the hours, make the hours count.",
  "Dream big, study harder."
];

// random quote on load
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById('startBtn').onclick = startTimer;
document.getElementById('stopBtn').onclick = stopTimer;
document.getElementById('resetBtn').onclick = resetTimer;
document.getElementById('saveGoalBtn').onclick = saveGoal;

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 1000);
    running = true;
  }
}

function stopTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
    saveTime();
    updateProgress();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  timeDisplay.innerHTML = "00:00:00";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  timeDisplay.innerHTML =
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}

function saveTime() {
  let total = parseInt(localStorage.getItem('studyMinutes')) || 0;
  total += Math.floor(difference / (1000 * 60));
  localStorage.setItem('studyMinutes', total);
  totalTimeDisplay.textContent = total;
}

function saveGoal() {
  const goalValue = document.getElementById('goalInput').value;
  if (goalValue && goalValue > 0) {
    localStorage.setItem('studyGoal', goalValue);
    goalStatus.textContent = `🎯 Daily Goal: ${goalValue} mins`;
    updateProgress();
  }
}

function updateProgress() {
  const total = parseInt(localStorage.getItem('studyMinutes')) || 0;
  const goal = parseInt(localStorage.getItem('studyGoal')) || 100;
  const percent = Math.min((total / goal) * 100, 100);
  progressFill.style.width = percent + "%";
  
  if (percent >= 100) {
    quoteText.textContent = "🔥 Goal achieved! Great job!";
  }
}

window.onload = function() {
  totalTimeDisplay.textContent = localStorage.getItem('studyMinutes') || 0;
  const goal = localStorage.getItem('studyGoal');
  if (goal) {
    goalStatus.textContent = `🎯 Daily Goal: ${goal} mins`;
  }
  updateProgress();
};
