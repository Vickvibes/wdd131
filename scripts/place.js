const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperature = 10;
const windSpeed = 5;
const temperatureDisplay = document.querySelector("#temperature");
const windSpeedDisplay = document.querySelector("#wind-speed");
const windChillDisplay = document.querySelector("#wind-chill");

function calculateWindChill(temperatureCelsius, windSpeedKmh) {

    return 13.12 + 0.6215 * temperatureCelsius - 11.37 * windSpeedKmh ** 0.16 + 0.3965 * temperatureCelsius * windSpeedKmh ** 0.16;
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

if (temperatureDisplay && windSpeedDisplay && windChillDisplay) {
    temperatureDisplay.textContent = temperature;
    windSpeedDisplay.textContent = windSpeed;
    windChillDisplay.textContent = temperature <= 10 && windSpeed > 4.8
        ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00b0C`
        : "N/A";
}