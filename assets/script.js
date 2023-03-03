const apiKey = '8c6e6a5f4bba093bda958cb2224e264b';

const searchButton = document.getElementById("search-button");
const searchLocation = document.getElementById("location");
const error = document.getElementById("error");
const cityName = document.getElementById("location-name");
const weatherDate = document.getElementById("weather-date");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const weatherHumidity = document.getElementById("humidity");
const weatherIcon = document.getElementById("weather-icon");
const forecastDiv = document.getElementById("forecast");
const recent = document.getElementById("recent-locations");

function loadRecent() {

	while (recent.firstChild) {
		recent.removeChild(recent.firstChild);
	}

	for (let i = 0; i < localStorage.length; i++) {
		const name = localStorage.getItem(localStorage.key(i));
		const btn = document.createElement("BUTTON");

		btn.innerText = name;
		btn.addEventListener('click', e => {
			dataFetch(name);
		})

		recent.append(btn);
	}
}

function onClickSearchButton(e) {
    const city = searchLocation.value;
	if (city === "") {
		error.textContent = "City name is required"
		return;
	}
	dataFetch(city);
	loadRecent();
}


function lookupLocation(search)

function displayWeatherForecast(weatherData)