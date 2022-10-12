const mainContent = document.querySelector('#mainContent');
/******************************** functions    ***************************/

// checks a local variable and creates a new local variable if one does not exist
// const localStorageCities = function (city) {
// 	let citySearched = JSON.parse(localStorage.getItem(cities));
// 	if (citySearched === null) {
// 		citySearched = [city];
// 		localStorage.setItem(cities, JSON.stringify(citySearched));
// 	} else if(citySearched.indexof(city) = -1){
// 		citySearched.push(city);
// 		localStorage.setItem(cities, JSON.stringify(citySearched));
// 	}else {
// 		return;
// 	}};

// adds dates to the cards
const addToDate = function () {
	const mainDate = document.querySelector('#date1');
	const day2 = document.querySelector('.date2');
	const day3 = document.querySelector('.date3');
	const day4 = document.querySelector('.date4');
	const day5 = document.querySelector('.date5');
	const day6 = document.querySelector('.date6');

	let currentDate = moment().add(0, 'days').format('L');
	mainDate.textContent = ' ' + currentDate;
	currentDate = moment().add(1, 'days').format('L');
	day2.textContent = currentDate;
	currentDate = moment().add(2, 'days').format('L');
	day3.textContent = currentDate;
	currentDate = moment().add(3, 'days').format('L');
	day4.textContent = currentDate;
	currentDate = moment().add(4, 'days').format('L');
	day5.textContent = currentDate;
	currentDate = moment().add(5, 'days').format('L');
	day6.textContent = currentDate;
};

// fetch the weather url
const cityWeatherForecast = function (city) {
	const apiKey = 'c28fc1b364c90425efe5f07076264d92';
	const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
	const apiUrl = baseUrl + 'q=' + city + '&appid=' + apiKey;

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (cityData) {
					console.log(cityData);
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
								// localStorageCities(city);
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
	let j = 5;
	let date;
		let cityName;
		let fiveDayTitle;
		let card;
		let mainEl;
		let mainCard;

	for (let i = 1; i < 6; i++, j += 8) {
		let curDate = 'date' + i;
		if (i === 1) {
			mainEl = document.createElement('div');
			mainEl.setAttribute('class', 'dayOne');
			mainEl.setAttribute('id', 'dayOne');
			cityName = document.createElement('div');
			cityName.setAttribute('id', 'displayedCity');
			cityName.textContent = city;
			date = document.createElement('span');
			date.setAttribute('id', curDate);
			cityName.appendChild(date);
			mainEl.appendChild(cityName);
		} else if (i === 2) {
			fiveDayTitle = document.createElement('h2');
			fiveDayTitle.setAttribute('class', 'five_day_title');
			fiveDayTitle.textContent = '5-Day Forecast';
			mainContent.appendChild(fiveDayTitle);
			mainCard = document.createElement('div');
			mainCard.setAttribute('class', 'cards');
			card = document.createElement('div');
			date = document.createElement('div');
			date.setAttribute('id', curDate);
		}else{
			mainCard = document.createElement('div');
			mainCard.setAttribute('class', 'card');
			card = document.createElement('div');
			date = document.createElement('div');
			date.setAttribute('id', curDate);
		}

		let temp = document.createElement('div');
		temp.textContent = 'Temp: ' + cityData.list[j].main.temp;
		let wind = document.createElement('div');
		wind.textContent = 'Wind: ' + cityData.list[j].wind.speed + ' MPH';
		let humidity = document.createElement('div');
		humidity.textContent = 'Humidity: ' + cityData.list[j].main.humidity;

		if (i === 1) {
			mainEl.appendChild(date);
			mainEl.appendChild(temp);
			mainEl.appendChild(wind);
			mainEl.appendChild(humidity);
			mainContent.appendChild(mainEl);
		} else if (i < 6 ) {
			card.appendChild(date);
			card.appendChild(temp);
			card.appendChild(wind);
			card.appendChild(humidity);
			mainCard.appendChild(card);
			mainContent.appendChild(mainCard);
		} else {
			mainContent.appendChild(mainCard);
		}
	}
	// addToDate();
};

cityWeatherForecast('Reno');
