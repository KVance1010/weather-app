# Weather Dashboard: Server-Side APIs

## Overview

Weather application that shows the current weather and a five day forecast for the chosen city.

### learning points

- leverage a third-party API to collect server-side data and use it to displays information to the website
- Create elements dynamically using JavaScript 


## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Technologies

- **Server Side APIs**
- **Fetch**
- **JavaScript**
- **HTML**
- **CSS**

## Screenshot/mockup

![Schedule at the start of the day](./assets/images/weather-app.jpg)
App with 5 day forecast

## CodeSnippets

### Dynamically creating the weather cards for a five day forecast

```JavaScript
for (let i = 1; i < 6; i++, j += 8) {
		let card = document.createElement('div');
		card.setAttribute('class', 'card');
		let date = document.createElement('div');
		date.textContent = moment().add(i, 'days').format('L');
		let weatherIcon = document.createElement('img');
		weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + cityData.list[j].weather[0].icon + '@2x.png');
		weatherIcon.setAttribute('alt', 'weatherIcon');
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
		card.appendChild(weatherIcon);
		card.appendChild(temp);
		card.appendChild(wind);
		card.appendChild(humidity);
		cards.appendChild(card);
	}
```

## License

Please refer to the LICENSE in the repo.

## Links

### live Link

[Live website] https://kvance1010.github.io/weather-app/

### LinkedIn

[LinkedIn] https://www.linkedin.com/in/kyle-s-vance
