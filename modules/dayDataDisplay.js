import { getDayInfo } from "./loadData";

export default async function dayDisplay(units, initialLoad) {
  const locationName = document.getElementById("location-name");
  const currentTemp = document.getElementById("temp");
  const feelsLike = document.getElementById("feels-like");
  const currentCondition = document.getElementById("current-condition");
  const conditionImg = document.getElementById("condition-img");
  const currentTime = document.getElementById("current-time");
  const currentDate = document.getElementById("current-date");
  const windSpeed = document.getElementById("wind-speed");
  const humidity = document.getElementById("humidity");
  const precipChance = document.getElementById("precip-chance");

  const dayInfo = await getDayInfo(units, initialLoad);

  currentDate.innerText = dayInfo.date;
  currentTime.innerText = dayInfo.time;

  const displayLocation = () => {
    if (dayInfo.country === "United States of America") {
      locationName.innerText = `${dayInfo.city}, ${dayInfo.region}`;
    } else {
      locationName.innerText = `${dayInfo.city}, ${dayInfo.country}`;
    }
  };

  windSpeed.innerText =
    units === "C" ? `${dayInfo.windSpeed} km/h` : `${dayInfo.windSpeed} mp/h`;
  humidity.innerText = `${dayInfo.humidity}%`;
  precipChance.innerText = `${dayInfo.precipChance}%`;

  currentTemp.innerText =
    units === "C" ? `${dayInfo.temp}°C` : `${dayInfo.temp}°F`;
  feelsLike.innerText =
    units === "C" ? `${dayInfo.feelsLike}°C` : `${dayInfo.feelsLike}°F`;

  currentCondition.innerText = dayInfo.condition;
  conditionImg.src = dayInfo.condIcon;

  displayLocation();
}
