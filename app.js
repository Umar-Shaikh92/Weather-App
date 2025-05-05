let city = document.getElementById("city");
let temperatureOfPlace = document.getElementById("temperature");
let weatherCondition = document.getElementById("condition");
let windSpeed = document.getElementById("wind");
let humidityLevel = document.getElementById("humidity");
let submitBtn = document.getElementById("submitBtn");
let searchBar = document.getElementById("searchBar");
const toastContainer = document.querySelector(".toast");
import { API_KEY } from "./apiKey.js";

function getWeather() {
  console.log(searchBar.value);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${API_KEY}&units=imperial`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data, "weather data");
      const { wind, main, name, weather } = data;
      city.innerHTML = name;
      windSpeed.innerHTML = `${Math.ceil(wind.speed)} kmh`;
      temperatureOfPlace.innerHTML = `${Math.round(
        ((main.temp - 32) * 5) / 9
      )} °C`;
      humidityLevel.innerHTML = `${main.humidity}%`;
      weatherCondition.innerHTML = weather[0].description;
    })

    .catch((err) => {
      console.log(err, "==>> err");

      if (toastContainer) {
        const toastBody = toastContainer.querySelector(".toast-body");
        toastBody.textContent = "Your input is incorrect";
        const toast = new bootstrap.Toast(toastContainer, {
          animation: true,
          autohide: true,
          delay: 4000,
        });
        toast.show();
      }
    });
}
submitBtn.addEventListener("click", getWeather);
