import dayDisplay from "./dayDataDisplay";
import forecastDisplay from "./forecastDataDisplay";

export default function dom() {
  const searchBox = document.getElementById("search-location");
  const tempToggle = document.getElementById("toggle-temp");
  const forecastContainer = document.getElementById("forecast-data");

  let units = "C";

  dayDisplay(units, true);
  forecastDisplay(units, true);

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      dayDisplay(units);
      forecastDisplay(units);
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
    dayDisplay(units);
    forecastDisplay(units);
  });

  window.addEventListener("resize", () => {
    if (screen.width >= 473) {
      forecastContainer.classList.remove("hidden");
    }
  });
}
