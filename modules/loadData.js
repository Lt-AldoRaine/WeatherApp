import * as weather from "./weatherApi";

let recentLocation = "New York";

function getUrl(initialLoad = false) {
  try {
    let locationName = "";

    if (initialLoad) {
      locationName = "New York";
    } else {
      locationName = weather.getFormInput();
    }

    if (!locationName) {
      return;
    }

    recentLocation = locationName;

    return weather.getRequestUrl(locationName);
  } catch (err) {
    console.error(err);
  }
}

export async function getDayInfo(units, initialLoad = false) {
  const url = getUrl(initialLoad);

  try {
    const currentData = await weather.getCurrentData(url);

    const currentDayInfo = {
      condition: currentData.condition.text,
      condIcon: currentData.condition.icon,
      temp: units === "C" ? currentData.temp_c : currentData.temp_f,
      feelsLike: currentData.feelslike_c,
      humidity: currentData.humidity,
      windSpeed: currentData.wind_kph,
    };

    return currentDayInfo;
  } catch (err) {
    console.error(err);
  }
}

export async function getForecastInfo(units, initialLoad = false) {
  const url = getUrl(initialLoad);

  try {
    const forecastData = await weather.getForecastData(url);

    const days = forecastData.forecastday;
    let forecastInfo = [];

    for (let i = 0; i < days.length; i++) {
      const dayOfWeek = new Date(days[i].date).toLocaleDateString("en-us", {
        weekday: "long",
      });
      const dayNum = new Date(days[i].date).getDay();
      const chanceOfRain = days[i].day.daily_chance_of_rain;
      const maxTemp =
        units === "C" ? days[i].day.maxtemp_c : days[i].day.maxtemp_f;
      const minTemp =
        units === "C" ? days[i].day.mintemp_c : days[i].day.mintemp_f;

      const dayInfo = {
        dayOfWeek: dayOfWeek,
        dayNum: dayNum,
        chanceOfRain: chanceOfRain,
        maxTemp: maxTemp,
        minTemp: minTemp,
      };

      forecastInfo.push(dayInfo);
    }

    return forecastInfo.sort((a, b) => a.dayNum - b.dayNum);
  } catch (err) {
    console.error(err);
  }
}
