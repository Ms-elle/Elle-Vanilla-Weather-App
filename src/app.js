function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours} ${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round
    (celsiusTemperature);
     let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
       let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
     let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
       let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
let apiKey = "d56bb5a206f2cbf907ca9677eab33e96";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
    let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(farenheitTemperature);
        celsiusLink.classList.remove(`#active`);
            farenheitLink.classList.add(`#active`);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

