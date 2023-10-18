import { getDayInfo } from "./loadData";

export default async function dayDisplay(units, initialLoad) {
  const locationName = document.getElementById("location-name");
  const currentTemp = document.getElementById("temp");
  const feelsLike = document.getElementById("feels-like");
  const currentCondition = document.getElementById("current-condition");

  const dayInfo = await getDayInfo(units, initialLoad);

  const displayLocation = () => {
    if (dayInfo.country === "United States of America") {
      locationName.innerText = `${dayInfo.city}, ${dayInfo.region}`;
    } else {
      locationName.innerText = `${dayInfo.city}, ${dayInfo.country}`;
    }
  };

  currentTemp.innerText =
    units === "C" ? `${dayInfo.temp}°C` : `${dayInfo.temp}°F`;
  feelsLike.innerText =
    units === "C" ? `${dayInfo.feelsLike}°C` : `${dayInfo.feelsLike}°F`;

  currentCondition.src = dayInfo.condIcon;

  displayLocation();
}
