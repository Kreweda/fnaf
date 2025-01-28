// Definicja tytułów nocy
const nightTitles = [
    "Noc 1 - Zjawa Koteu",
    "Noc 2 - Śmiech na (nie) pustej sali",
    "Noc 3 - Nie oglądaj się za siebie",
    "Noc 4 - Bez ryzyka nie ma Koteua",
    "Noc 5 - Upadek wytrwałych",
    "Noc 6 - Gorzej być (nie) może"
];

const nightTitle = document.getElementById('night-title');
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const flashlightButton = document.getElementById('flashlight-button');
const attackButton = document.getElementById('attack-button');
const endPopup = document.getElementById('end-popup');
const popupText = document.getElementById('popup-text');
const nextNightButton = document.getElementById('next-night-button');
const restartButton = document.getElementById('restart-button');
const continueButton = document.getElementById('continue-button');
const batteryLevelElement = document.getElementById("battery-level");
const batteryTextElement = document.getElementById("battery-text");

let currentNight = 1;
let currentTime = 0;
let intervalId;
let batteryLevel = 100;
let flashlightOn = false;
let batteryDrainSpeed = 6000;
let batteryInterval;

function updateClock() {
    currentTime++;
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    if (hours === 6) {
        clearInterval(intervalId);
        showEndPopup();
    }
}

function showEndPopup() {
    const nightName = `Noc ${currentNight}`;
    popupText.textContent = `Przetrwałeś ${nightName}. Gotów na kolejną?`;
    endPopup.classList.remove('hidden');
}

function resetBattery() {
    batteryLevel = 100;
    batteryLevelElement.style.width = "100%";
    batteryTextElement.textContent = "100%";
    flashlightButton.disabled = false;
    flashlightOn = false;
    flashlightButton.textContent = "Latarka";
    batteryDrainSpeed = 6000;
}

function updateBattery() {
    if (batteryLevel > 0) {
        batteryLevel--;
        batteryLevelElement.style.width = `${batteryLevel}%`;
        batteryTextElement.textContent = `${batteryLevel}%`;

        if (batteryLevel === 0) {
            flashlightButton.disabled = true;
            flashlightOn = false;
        }
    }
}

function startBatteryDrain() {
    clearInterval(batteryInterval);
    batteryInterval = setInterval(updateBattery, batteryDrainSpeed);
}

flashlightButton.addEventListener("click", () => {
    if (batteryLevel > 0) {
        flashlightOn = !flashlightOn;

        if (flashlightOn) {
            flashlightButton.textContent = "Wyłącz latarkę";
            batteryDrainSpeed = 3000;
        } else {
            flashlightButton.textContent = "Latarka";
            batteryDrainSpeed = 6000;
        }
        startBatteryDrain();
    } else {
        alert("Bateria rozładowana! Latarka nie działa.");
    }
});

startButton.addEventListener("click", () => {
    if (intervalId) clearInterval(intervalId);
    currentTime = 0;
    timeDisplay.textContent = "00:00";
    intervalId = setInterval(updateClock, 1000);
    resetBattery();
    startBatteryDrain();  // Teraz bateria zacznie schodzić dopiero po naciśnięciu Start
});

attackButton.addEventListener("click", () => {
    alert("Zjawa cię zaatakowała! Rozpoczynasz noc od nowa.");
    if (intervalId) clearInterval(intervalId);
    currentTime = 0;
    timeDisplay.textContent = "00:00";
    resetBattery();
    startBatteryDrain();
});

