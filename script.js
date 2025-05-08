let countdownInterval;
let totalSeconds = 0;
let yellowTime = 0;
let redTime = 0;

function updateTimerDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
  clearInterval(countdownInterval);
  updateTimerDisplay(totalSeconds);
  updateLights(totalSeconds);

  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      updateLights(0);
      return;
    }
    totalSeconds--;
    updateTimerDisplay(totalSeconds);
    updateLights(totalSeconds);
  }, 1000);
}

function updateLights(secondsLeft) {
  const green = document.getElementById('greenLight');
  const yellow = document.getElementById('yellowLight');
  const red = document.getElementById('redLight');

  const remainingMinutes = Math.floor(secondsLeft / 60);

  if (remainingMinutes <= redTime) {
    red.style.background = 'red';
    yellow.style.background = 'gray';
    green.style.background = 'gray';
  } else if (remainingMinutes <= yellowTime) {
    yellow.style.background = 'yellow';
    green.style.background = 'gray';
    red.style.background = 'gray';
  } else {
    green.style.background = 'green';
    yellow.style.background = 'gray';
    red.style.background = 'gray';
  }
}

// Botões
let settingsVisible = false;
document.getElementById('settingsButton').addEventListener('click', () => {
  settingsVisible = !settingsVisible;
  document.getElementById('settings').style.display = settingsVisible ? 'flex' : 'none';
});

document.getElementById('startButton').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;

  totalSeconds = (hours * 3600) + (minutes * 60);
  yellowTime = parseInt(document.getElementById('yellowTimeInput').value) || 0;
  redTime = parseInt(document.getElementById('redTimeInput').value) || 0;

  document.getElementById('settings').style.display = 'none';
  startTimer();
});

// Reiniciar o cronômetro
document.getElementById('restartButton').addEventListener('click', () => {
  totalSeconds = (parseInt(document.getElementById('hoursInput').value) || 0) * 3600
    + (parseInt(document.getElementById('minutesInput').value) || 0) * 60;
  updateTimerDisplay(totalSeconds);
  clearInterval(countdownInterval);
  updateLights(totalSeconds);
  startTimer();
});

// Slider de tamanho do cronômetro + luzes
document.getElementById('sizeInput').addEventListener('input', function () {
  const size = this.value;
  document.getElementById('timer').style.fontSize = size + 'vw';
  
  // Atualiza também o tamanho das luzes!
  const lights = document.querySelectorAll('.light');
  lights.forEach(light => {
    light.style.width = size * 0.44 + 'vw'; // 0.44 para ficar proporcional
    light.style.height = size * 0.44 + 'vw';
  });
});
