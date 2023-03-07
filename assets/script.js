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


function dataFetch(city) {
	while (forecastDiv.firstChild) {
		forecastDiv.removeChild(forecastDiv.firstChild);
	}

	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			const {name, weather, main, wind} = data;
			const icon = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
			cityName.textContent = city;
			weatherDate.textContent = new Date().toDateString();

			weatherIcon.src = icon;

			temperature.textContent = main.temp + " \u2109";
			windSpeed.textContent = wind.speed + " MPH";
			weatherHumidity.textContent = main.humidity + " %";

			if (localStorage.getItem(city) == null) {
				localStorage.setItem(city, city);
			}

		})
		.catch(error => {
			console.error('Error fetching weather data:', error);
			error.textContent = 'Error fetching weather data';
		});


	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

	fetch(url)
		.then(response => response.json())
		.then(data => {

			let dataList = [];
			const dateList = [];
			data.list.forEach(d => {
				const cDay = new Date(d.dt * 1000).getDate();
				if (dateList.includes(cDay) === false) {
					dataList.push(d);
					dateList.push(cDay);
				}
			})

			dataList = dataList.slice(1, 6);

			dataList.forEach(day => {
				const date = new Date(day.dt * 1000);
				const description = day.weather[0].description;
				const temp = day.main.temp;
				const speed = day.wind.speed;
				const humidity = day.main.humidity;
				const weatherIcon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

				const div = document.createElement('DIV');
				div.classList.add('forecast-tile');


				div.innerHTML = '' +
					'<h3>' + date.toDateString() + '<h3>' +
					'<img src="' + weatherIcon + '"/>' +
					'<h4>Temp: ' + temp + ' \u2109<h4>' +
					'<h4>Wind: ' + speed + ' MPH<h4>' +
					'<h4>Humidity: ' + humidity + ' %<h4>';
				forecastDiv.append(div);
			});
		})
		.catch(error => {
			console.error('Error fetching weather forecast data:', error);
			error.textContent = 'Error fetching weather data';
		});

}


searchButton.addEventListener('click', onClickSearchButton);
searchLocation.addEventListener('click', ev => {
	error.innerText = ""
})