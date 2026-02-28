const APIURL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "012fed406a258c5ba5fdab281ff05a94";

const searchBox = document.querySelector("#city-input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherRegion = document.querySelector(".weather");

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") checkWeather(searchBox.value.trim());
});

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

async function checkWeather(city) {
  if (!city) return; // bo'sh bo'lsa chiqib ketadi

  try {
    const response = await fetch(
      `${APIURL}?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const data = await response.json();
    if (!response.ok) {
      weatherRegion.setAttribute("aria-label", "City not found");
      document.querySelector(".city").innerText = "City not found";
      document.querySelector(".temp").innerText = "--°C";
      document.querySelector(".humidity").innerText = "--%";
      document.querySelector(".wind").innerText = "-- km/h";
      document.querySelector(".weather").style.display = "block";
      return;
    }

    const weatherType = data.weather[0].main;
    let weatherDescription = data.weather[0].description;

    switch (weatherType) {
      case "Clouds":
        weatherIcon.src = "./img/clouds.png";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
      case "Clear":
        weatherIcon.src = "./img/clear.png";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
      case "Rain":
        weatherIcon.src = "./img/rain.png";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
      case "Drizzle":
        weatherIcon.src = "./img/drizzle.jpg";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
      case "Mist":
        weatherIcon.src = "./img/mist.png";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
      default:
        weatherIcon.src = "./img/default.png";
        weatherIcon.alt = `Weather icon showing ${weatherDescription}`;
        break;
    }

    weatherRegion.setAttribute("aria-label", `Weather information for ${data.name}: ${Math.round(data.main.temp)}°C, ${weatherDescription}`);
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}
