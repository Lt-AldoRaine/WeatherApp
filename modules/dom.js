import { getDayInfo, getForecastInfo } from "./loadData";

export default function dom() {
  const searchBox = document.getElementById("search-location");

  let units = "C";
  let dayInfo = getDayInfo(units, true);
  let forecastInfo = getForecastInfo(units, true);

  console.log(forecastInfo);
  console.log(dayInfo);
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      dayInfo = getDayInfo(units);
      forecastInfo = getForecastInfo(units);
      console.log(forecastInfo);
      console.log(dayInfo);
    }
  });
}
