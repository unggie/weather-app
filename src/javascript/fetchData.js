import loadingCircle from '../images/loading-icon.png'
function loadingScreen(load) {
    const loadingScreen = document.querySelector('#loading-screen');
    const mainScreen = document.querySelector('#main-info');
    const image = document.querySelector('.loading-circle-img');
    const errorScreen = document.querySelector('#error');

    image.src = loadingCircle;

    if (load === true) {
        loadingScreen.style.display = 'flex';
        mainScreen.style.display = 'none';
        errorScreen.style.display = 'none'
    } else if (load === false) {
        loadingScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
    } else {
        return;
    }
}
function onError(error) {
    const loadingScreen = document.querySelector('#loading-screen');
    const mainScreen = document.querySelector('#main-info');
    const image = document.querySelector('.loading-circle-img');
    const errorScreen = document.querySelector('#error');

    loadingScreen.style.display = 'flex';
    mainScreen.style.display = 'none';
    image.style.display = 'none';

    errorScreen.textContent = `Error: ${error}`;
    errorScreen.style.display = 'flex';
}
function dataObject(data) {
    const day = data.days[0];
   
    const dateTime = new Date(day.datetime);
    const currentDay = dateTime.toLocaleDateString('en-US', {
        weekday: 'long'
    });
    const location = data.address;
    const temperature = day.temp;
    const humidity = day.humidity;
    const precipitation = day.precip;
    const snow = day.snow;
    const windSpeed = day.windspeed;
    const conditions = day.conditions;
    const icon = day.icon;

    return {currentDay, location, temperature, humidity, precipitation, snow, windSpeed, conditions, icon}
}
function toFahrenheit(value, execute) {
    if (execute === true) {
        // Fahrenheit to Celsius
        return ((value - 32) * (5 / 9)).toFixed(1);
    } else if (execute === false) {
        // Celsius to Fahrenheit 
        return ((value * (9 / 5)) + 32).toFixed(1);
    }
}
const weatherIcons = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "☁️🌙",
  "cloudy": "☁️",
  "rain": "🌧️",
  "showers-day": "🌦️",
  "showers-night": "🌧️🌙",
  "thunder-rain": "⛈️",
  "snow": "❄️",
  "fog": "🌫️",
  "wind": "💨"
};

function displayInfo(data) {
    const temp = document.getElementById('temp');

    const icon = document.getElementById('icon');
    const cityName = document.getElementById('city');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const precipitation = document.getElementById('precipitation');
    const windSpeed = document.getElementById('wind-speed');
    const snow = document.getElementById('snow');
    const day = document.getElementById('date');
    const toggle = document.getElementById('toggle');
    const tempSystem = document.getElementById('temp-system');
    console.log(toggle.checked);

    icon.textContent = weatherIcons[data.icon];
    cityName.textContent = data.location;
    description.textContent = data.conditions;
    humidity.textContent = `${data.humidity}%`;
    precipitation.textContent = `${data.precipitation}mm`;
    windSpeed.textContent = `${data.windSpeed}km/h`;
    snow.textContent =`${data.snow}mm`;
    day.textContent = data.currentDay;

    if (toggle.checked === true) {
        temp.textContent = toFahrenheit(Number(data.temperature), false);
        tempSystem.textContent = "F";
        return;
    } 
   
    temp.textContent = data.temperature;
    tempSystem.textContent = "C";
}
// let weatherObject;
export async function fetchData(location) {
    try {
        loadingScreen(true);
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=DHQ3EMTY7UXMJP33KDPF9YDRC`);
        if (response.ok) {
            loadingScreen(false);
            const data = await response.json();
            
            console.log(data, dataObject(data));

            displayInfo(dataObject(data));
            return dataObject(data);
        } else {
            onError(response.status);
            setTimeout(() => {
                loadingScreen(false);
            }, 2000)
            throw new Error(`${response.status}`);
        }
    } catch (error) {
        onError(error.message);
        setTimeout(() => {
                loadingScreen(false);
        }, 2000)
        console.error(error.message);
    } 
}
const toggle = document.getElementById('toggle');
toggle.addEventListener('change', (event) => {
    const temp = document.getElementById('temp');
    const tempSystem = document.getElementById('temp-system');
    if (toggle.checked === true) {
        temp.textContent = toFahrenheit(Number(temp.textContent), false);
        tempSystem.textContent = "F";
    } else {
        temp.textContent = toFahrenheit(Number(temp.textContent), true);
        tempSystem.textContent = "C";
    }
})
