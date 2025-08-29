let timer, time = 0, running = false, lastLapTime = 0;
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') startTimer();
    if (event.key === 'p' || event.key === 'P') pauseTimer();
    if (event.key === 'r' || event.key === 'R') resetTimer();
    if (event.key === 'l' || event.key === 'L') recordLap();
});

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            time++;
            display.textContent = formatTime(time);
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    time = 0;
    lastLapTime = 0;
    display.textContent = formatTime(time);
    lapsList.innerHTML = '';
    localStorage.removeItem('laps');
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        const lapTime = formatTime(time);
        const lapDiff = formatTime(time - lastLapTime);
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime} (Δ${lapDiff})`;
        lapsList.appendChild(lapItem);
        lastLapTime = time;
        saveLaps();
    }
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function saveLaps() {
    const laps = [];
    document.querySelectorAll('#laps li').forEach(item => laps.push(item.textContent));
    localStorage.setItem('laps', JSON.stringify(laps));
}

window.onload = () => {
    const savedLaps = JSON.parse(localStorage.getItem('laps'));
    if (savedLaps) {
        savedLaps.forEach(lap => {
            const lapItem = document.createElement('li');
            lapItem.textContent = lap;
            lapsList.appendChild(lapItem);
        });
    }
};
