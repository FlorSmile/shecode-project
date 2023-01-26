let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here
//let city = prompt("Enter a city");
/*city = city.trim().toLowerCase();

if (weather[city] !== undefined) {
  alert(
    `It is currently ${Math.round(weather[city].temp)}°C (${Math.round(
      (weather[city].temp * 9) / 5 + 32
    )}°F) in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/
//Change date
let nowDate = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = day[nowDate.getDay()];
let hour = nowDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = nowDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let date = document.querySelector(".date");
date.innerHTML = `${weekDay}, ${hour}:${minute}`;

//Change city name
function searchCity() {
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = searchInput.value;
    getCityWeather();
  }
}

function checkEnter(event) {
  if (event.keyCode === 13) {
    searchCity();
  }
}

let searchButton = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
searchButton.addEventListener("click", searchCity);
searchInput.addEventListener("keydown", checkEnter);

//Change temperature
function calcCelsius() {
  if (temp === "F") {
    let h1 = document.querySelector("h1");
    let linkCelsius = document.querySelector("#link-celsius");
    let linkFahrenheit = document.querySelector("#link-fahrenheit");

    h1.innerHTML = Math.round(((h1.innerText - 32) * 5) / 9);
    linkCelsius.classList.add("link-active");
    linkFahrenheit.classList.remove("link-active");
    return (temp = "C");
  }
}

function calcFahrenheit() {
  if (temp === "C") {
    let h1 = document.querySelector("h1");
    let linkCelsius = document.querySelector("#link-celsius");
    let linkFahrenheit = document.querySelector("#link-fahrenheit");

    h1.innerHTML = Math.round((h1.innerText * 9) / 5 + 32);
    linkFahrenheit.classList.add("link-active");
    linkCelsius.classList.remove("link-active");
    return (temp = "F");
  }
}

let linkCelsius = document.querySelector("#link-celsius");
let linkFahrenheit = document.querySelector("#link-fahrenheit");
let temp = "C";
linkCelsius.addEventListener("click", calcCelsius);
linkFahrenheit.addEventListener("click", calcFahrenheit);

//Change temperature/weather info
function getWeatherInfo(response) {
  console.log(response);
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("h2");
  let h1 = document.querySelector("h1");
  let temp = Math.round(response.data.main.temp);
  let weatherText = document.querySelector(".weather-text");
  let precipitation = document.querySelector("#precipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let mainImg = document.querySelector(".main_img");

  searchInput.innerHTML = null;
  city.innerHTML = response.data.name;
  h1.innerHTML = temp;
  weatherText.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  mainImg.src =
    mainImg.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}

//City weather
function getCityWeather() {
  let city = document.querySelector("h2");
  city = city.textContent;

  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherInfo);
}

//Current position
function getCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherInfo);
}

//Current position weather
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

getCityWeather();
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocationWeather);
