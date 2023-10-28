import dayDisplay from "./dayDataDisplay";
import forecastDisplay from "./forecastDataDisplay";
import chevronRight from "../resources/img/chevron-right.png";
import chevronDown from "../resources/img/chevron-down.png";

const loadDisplay = (units, initLoad) => {
  const day = dayDisplay(units, initLoad);
  const forecast = forecastDisplay(units, initLoad);

  const data = [day, forecast];

  return data;
};

export default function dom() {
  const searchBox = document.getElementById("search-location");
  const tempToggle = document.getElementById("toggle-temp");
  const forecastContainer = document.getElementById("forecast-data");
  const expandButton = document.getElementById("expand-forecast");
  const chevron = document.getElementById("chevron");

  let units = "C";
  let minimized = false;

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

  expandButton.addEventListener("click", () => {
    if (forecastContainer.classList.contains("hidden")) {
      chevron.src = chevronDown;
      forecastContainer.classList.remove("hidden");
      minimized = false;
    } else {
      forecastContainer.classList.add("hidden");
      chevron.src = chevronRight;
      minimized = true;
    }
  });

  minimized
    ? forecastContainer.classList.add("hidden")
    : forecastContainer.classList.remove("hidden");

  window.addEventListener("resize", () => {
    if (screen.width >= 473) {
      forecastContainer.classList.remove("hidden");
    }
  });
}
