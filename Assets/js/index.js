// global variables
const cards = document.querySelector('.cards');
const currentCity = document.querySelector('#displayedCity');
const tempMain = document.querySelector('#tempMain');
const windMain = document.querySelector('#windMain');
const humidityMain = document.querySelector('#humidityMain');


/******************************** functions    ***************************/

// checks a local variable and creates a new local variable if one does not exist
let localStorageCities = function (city) {
	let cities = JSON.parse(localStorage.getItem('cities'));
	if (cities === null) {
		cities = [city];
		localStorage.setItem('cities', JSON.stringify(cities));
	} else if(cities.indexOf(city) === -1){
		cities.push(city);
		localStorage.setItem('cities', JSON.stringify(cities));
	}else {
		return;
	}};

// fetch the weather url
const cityWeatherForecast = function (city) {
	const apiKey = 'c28fc1b364c90425efe5f07076264d92';
	const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
	const apiUrl = baseUrl + 'q=' + city + '&appid=' + apiKey;

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (cityData) {
					let lon = cityData.city.coord.lon;
					let lat = cityData.city.coord.lat;
					let lonLatURL =
						baseUrl +
						'lat=' +
						lat +
						'&lon=' +
						lon +
						'&units=imperial&appid=' +
						apiKey;
					fetch(lonLatURL).then(function (response) {
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
			} else {
				alert('Error: ' + response.statusText);
			}
		})
		.catch(function (error) {
			alert('Unable to connect' + error.message);
		});
};

const displayCity = function (cityData, city) {
	console.log(cityData, city);
	if (city.length === 0) {
		repoContainerEl.textContent = 'No content found.';
		return;
	}
	currentCity.textContent = city + ' ' + moment().add(0, 'days').format('L');
	
	let j = 5;
	for (let i = 1; i < 6; i++, j += 8) {
		let card = document.createElement('div');
		card.setAttribute('class', 'card');
		let date = document.createElement('div');
		date.textContent = moment().add(i, 'days').format('L');
		let temp = document.createElement('div');
		temp.textContent = 'Temp: ' + cityData.list[j].main.temp;
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
};

cityWeatherForecast('Denver');
