// global variables
const cards = document.querySelector('.cards');
const currentCity = document.querySelector('#displayedCity');
const tempMain = document.querySelector('#tempMain');
const windMain = document.querySelector('#windMain');
const humidityMain = document.querySelector('#humidityMain');
const cityList = document.querySelector('.cityList');
const searchBtn = document.querySelector('.searchBtn');
const citySearch = document.querySelector('#citySearch');
const weatherIcon = document.querySelector('#weatherIcon');

/******************************** functions    ***************************/

// checks a local variable and creates a new local variable if one does not exist
let localStorageCities = function (city) {
	let cities = JSON.parse(localStorage.getItem('cities'));
	if (cities === null) {
		cities = [city];
		localStorage.setItem('cities', JSON.stringify(cities));
	} else if (cities.indexOf(city) === -1) {
		cities.push(city);
		localStorage.setItem('cities', JSON.stringify(cities));
	} else {
		return;
	}
};

// fetch the weather url
const cityWeatherForecast = function (city) {
	const apiKey = 'c28fc1b364c90425efe5f07076264d92';
	const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
	const apiUrl = baseUrl + 'q=' + city + '&appid=' + apiKey;

	const currentForecast = 'https://api.openweathermap.org/data/2.5/weather?';

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (cityData) {
					let lon = cityData.city.coord.lon;
					let lat = cityData.city.coord.lat;
					let lonLatURL =
						'lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
					fetch(currentForecast + lonLatURL).then(function (response) {
						if (response.ok) {
							response.json().then(function (cityData) {
								console.log(cityData);
								currentCity.textContent =
									city + ' ' + moment().add(0, 'days').format('L');
								// weatherIcon.setAttribute('src',);
								tempMain.textContent =
									'Temp: ' +
									cityData.main.temp +
									' ' +
									String.fromCharCode(176) +
									'F';
								windMain.textContent =
									'Wind: ' + cityData.wind.speed + ' MPH';
								humidityMain.textContent =
									'Humidity: ' + cityData.main.humidity;
							});
						} else {
							alert('Error: ' + response.statusText);
						}
						fetch(baseUrl + lonLatURL).then(function (response) {
							if (response.ok) {
								response.json().then(function (cityData) {
									localStorageCities(city);
									displayCity(cityData, city);
								});
							} else {
								alert('Error: ' + response.statusText);
							}
						});
					});
				});
			} else {
				alert('Error: ' + response.statusText);
			}
		})
		.catch(function (error) {
			alert('Unable to connect' + error.message);
		});
};

// displays forecast to the html
const displayCity = function (cityData, city) {
	console.log(cityData, city);
	if (city.length === 0) {
		repoContainerEl.textContent = 'No content found.';
		return;
	}

	let j = 5;
	let child = cards.lastElementChild;
	while (child) {
		cards.removeChild(child);
		child = cards.lastElementChild;
	}

	for (let i = 1; i < 6; i++, j += 8) {
		let card = document.createElement('div');
		card.setAttribute('class', 'card');
		let date = document.createElement('div');
		date.textContent = moment().add(i, 'days').format('L');
		let temp = document.createElement('div');
		temp.textContent =
			'Temp: ' +
			cityData.list[j].main.temp +
			' ' +
			String.fromCharCode(176) +
			'F';
		let wind = document.createElement('div');
		wind.textContent = 'Wind: ' + cityData.list[j].wind.speed + ' MPH';
		let humidity = document.createElement('div');
		humidity.textContent = 'Humidity: ' + cityData.list[j].main.humidity;

		card.appendChild(date);
		card.appendChild(temp);
		card.appendChild(wind);
		card.appendChild(humidity);
		cards.appendChild(card);
	}
	startUp();
};

// creates the buttons of the different cities selected
const startUp = function () {
	let cities = JSON.parse(localStorage.getItem('cities'));
	if (cities) {
		let child = cityList.lastElementChild;
		while (child) {
			cityList.removeChild(child);
			child = cityList.lastElementChild;
		}
		for (const city of cities) {
			let button = document.createElement('button');
			button.textContent = city;
			cityList.appendChild(button);
		}
	}
};

// sets the current cityList
startUp();

/******************************** Event listeners    ***************************/
cityList.addEventListener('click', (buttonClicked) => {
	let reSearchCity = buttonClicked.target.textContent;
	cityWeatherForecast(reSearchCity);
});

searchBtn.addEventListener('click', () => {
	let newCity = citySearch.value;
	if (newCity) {
		citySearch.value = '';
		cityWeatherForecast(newCity);
	}
});
