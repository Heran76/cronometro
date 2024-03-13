let timer;
let running = false;
let startTime;
let stopTimes = [];

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStop');
const minButton = document.getElementById('min');
const secButton = document.getElementById('sec');
const resetButton = document.getElementById('reset');
const stopTimesList = document.getElementById('stopTimes');

function updateDisplay() {
    const elapsed = Date.now() - startTime;
    const date = new Date(elapsed);

    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);

    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
    millisecondsDisplay.textContent = milliseconds;
}

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        startStopButton.textContent = 'Inicio';
        stopTimes.push(formatTime(Date.now() - startTime));
        updateStopTimesList();
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        running = true;
        startStopButton.textContent = 'Paro';
    }
}


function reset() {
    clearInterval(timer);
    running = false;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    startStopButton.textContent = 'Inicio';
    stopTimes = [];
    stopTimesList.innerHTML = '';
}

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}
function updateStopTimesList() {
    stopTimesList.innerHTML = '';
    stopTimes.forEach(time => {
        const li = document.createElement('li');
        li.textContent = time;
        stopTimesList.appendChild(li);
    });
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

minButton.addEventListener('click', function() {
    const currentMinutes = parseInt(minutesDisplay.textContent);
    minutesDisplay.textContent = String(currentMinutes + 1).padStart(2, '0');
});

secButton.addEventListener('click', function() {
    const currentSeconds = parseInt(secondsDisplay.textContent);
    secondsDisplay.textContent = String(currentSeconds + 1).padStart(2, '0');
});



