// global variables
let currentDate = moment().format('dddd, MMMM Do YYYY');

// creating a new localStorage variable
// let citiesSearched = JSON.parse(localStorage.getItem('citiesSearched'));
// if (citiesSearched === null) {
// 	citiesSearched = [];
// 	localStorage.setItem('citiesSearched', JSON.stringify(workSchedule));
// }


// fetch the weather url
const cityWeatherForecast = function (city) {
    const apiKey = 'c28fc1b364c90425efe5f07076264d92'
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            // displayRepos(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect' + error.message);
      });
  };

  const displayRepos = function (repos, city) {
  
  };

cityWeatherForecast('reno');