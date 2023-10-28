import dayDisplay from "./dayDataDisplay";
import forecastDisplay from "./forecastDataDisplay";

const loadDisplay = (units, initLoad) => {
  const day = dayDisplay(units, initLoad);
  const forecast = forecastDisplay(units, initLoad);

  const data = [day, forecast];

  return data;
};

export default async function dom() {
  const searchBox = document.getElementById("search-location");
  const tempToggle = document.getElementById("toggle-temp");
  const forecastContainer = document.getElementById("forecast-data");

  let units = "C";

  loadDisplay(units, true);

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      loadDisplay(units);
    }
  });

  tempToggle.addEventListener("click", () => {
    if (tempToggle.innerText === "C") {
      tempToggle.innerText = "F";
      units = "F";
    } else {
      tempToggle.innerText = "C";
      units = "C";
    }
    loadDisplay(units);
  });

  window.addEventListener("resize", () => {
    if (screen.width >= 473) {
      forecastContainer.classList.remove("hidden");
    }
  });
}
