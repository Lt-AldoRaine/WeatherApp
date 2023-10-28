import { getForecastInfo } from "./loadData";
import chevronRight from "../resources/img/chevron-right.png";
import chevronDown from "../resources/img/chevron-down.png";

export default async function forecastDisplay(units, initialLoad = false) {
  const forecastContainer = document.getElementById("forecast-data");
  const expandButton = document.getElementById("expand-forecast");
  const chevron = document.getElementById("chevron");

  try {
    const forecastData = await getForecastInfo(units, initialLoad);

    forecastContainer.innerHTML = "";

    forecastData.forEach((day) => {
      const forecastDay = document.createElement("div");
      const dayOfWeek = document.createElement("p");
      const tempContainer = document.createElement("div");
      const highTemp = document.createElement("p");
      const lowTemp = document.createElement("p");
      const dayCondition = document.createElement("img");

      dayCondition.src = day.conditionIcon;
      // prettier-ignore
      highTemp.innerText = units === "C" ? `${day.maxTemp}°C` : `${day.maxTemp}°F`;
      lowTemp.innerText =
        units === "C" ? `${day.minTemp}°C` : `${day.minTemp}°F`;
      dayOfWeek.innerText = day.dayOfWeek;

      forecastDay.classList.add("forecast-day");
      forecastDay.setAttribute("data-day", day.dayNum);
      tempContainer.classList.add("temp-container");

      tempContainer.appendChild(highTemp);
      tempContainer.appendChild(lowTemp);

      forecastDay.appendChild(dayOfWeek);
      forecastDay.appendChild(dayCondition);
      forecastDay.appendChild(tempContainer);

      forecastContainer.appendChild(forecastDay);
    });

    expandButton.addEventListener("click", () => {
      if (forecastContainer.classList.contains("hidden")) {
        chevron.src = chevronDown;
        forecastContainer.classList.remove("hidden");
      } else {
        forecastContainer.classList.add("hidden");
        chevron.src = chevronRight;
      }
    });
    forecastContainer.style.display = "flex";
  } catch (err) {
    forecastContainer.style.display = "none";
  }
}
