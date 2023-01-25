const city = document.querySelector(".city");
const currentTemp = document.querySelector(".current-temp");
const tempMax = document.querySelector(".temp-max");
const tempMin = document.querySelector(".temp-min");
const icon = document.querySelector(".icon");

navigator.geolocation.getCurrentPosition(function (position) {
  const myFetch = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4bcea8495b2695dc05241a42cfe1a5ac`
  );

  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      city.textContent = result.name;
      currentTemp.textContent = result.main.temp;
      tempMax.textContent = result.main.temp_max;
      tempMin.textContent = result.main.temp_min;
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png">`;
    })
    .catch();
});
