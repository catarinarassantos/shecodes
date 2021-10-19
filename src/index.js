//Current Date & Time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDays[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()];
  let monthDay = date.getDate();
  return `${day}, ${month} ${monthDay} </br>${hours}:${minutes}`;
}

// Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="forecast-weekday">${day}</div>
    <img src="http://openweathermap.org/img/wn/50d@2x.png"
    alt=""
    width="50" />
    <div class="forecast-temperature">
      <span class="forecast-temperature-max"> 18° </span>
      <span class="forecast-temperature-min"> 12° </span>
    </div>
  </div>
`;
  });
forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Get all info from the API about a city you search

function showCityInfo(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#time-date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Automatic location showing when getting in the page (complemented with the search at the bottom)

function showPosition(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityInfo);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showPosition(city);
}

function buttonCurrent(position) {
  let myLat = position.coords.latitude;
  let myLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityInfo);
}

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(buttonCurrent);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }

// Variables

let apiKey = "0709d41b82ab100407f700115e011b71";

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", myLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", convertToFahrenheit); 
  
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

showPosition("Lisbon");
displayForecast();

