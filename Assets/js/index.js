// global variables

// query selectors
const mainDate = document.querySelector('#date1');
const day2 = document.querySelector('.date2');
const day3 = document.querySelector('.date3');
const day4 = document.querySelector('.date4');
const day5 = document.querySelector('.date5');
const day6 = document.querySelector('.date6');

/******************************** functions    ***************************/

// checks a local variable and creates a new local variable if one does not exist
// const localStorageCities = function(city){
// let citiesSearched = JSON.parse(localStorage.getItem(city));
// if (citiesSearched === null) {
// 	citiesSearched = {
//     name: '',
//     wind: '',
//     temp: '',
//     humidity: ''
//   };
// 	localStorage.setItem('citiesSearched', JSON.stringify(workSchedule));
// }
// }

// adds dates to the cards
const addToDate = function () {
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
							console.log(response);
							response.json().then(function (cityData) {
								console.log(cityData);

								// localStorageCities(cityData);
								// displayCity(city);
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

// const displayRepos = function (city) {
//   addToDate()

// 	if (city.length === 0) {
// 		repoContainerEl.textContent = 'No content found.';
// 		return;
// 	}
// 	console.log(repos.results.length);
// 	repoCity.textContent = city;

// 	for (const element of repos.results) {
// 		let repoName = element.title;
// 		let repoEl = document.createElement('div');
// 		repoEl.classList = 'list-item flex-row justify-space-between align-center';

// 		let titleEl = document.createElement('span');
// 		titleEl.textContent = repoName;

// 		repoEl.appendChild(titleEl);

// 		let statusEl = document.createElement('span');
// 		statusEl.classList = 'flex-row align-center';

// 		//   if (repos[i].open_issues_count > 0) {
// 		//     statusEl.innerHTML =
// 		//       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
// 		//   } else {
// 		//     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
// 		//   }

// 		repoEl.appendChild(statusEl);
// 		repoContainerEl.appendChild(repoEl);
// 	}
// };

cityWeatherForecast('reno');
addToDate();
