//Current Date & Time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekDays = week[weekDay];
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
  return `${weekDays}, ${month} ${monthDay} </br>${hours}:${minutes}`;
}

// Get all info from the API about a city you search

function showCityInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].main;
}

// Automatic location showing when getting in the page (complemented with the search at the bottom)

function showPosition(city) {
  let apiKey = "0709d41b82ab100407f700115e011b71";
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

// Variables

let dateElement = document.querySelector(".timeDate");
let nowDate = new Date();
dateElement.innerHTML = formatDate(nowDate);

let apiKey = "b5a777ab71fc602967504eb64daf1657";

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", myLocation);

showPosition("Lisbon");
