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
    const currentData = await weather.getWeatherData(url);

    const currentDayInfo = {
      city: currentData.location.name,
      region: currentData.location.region,
      country: currentData.location.country,
      condition: currentData.current.condition.text,
      condIcon: currentData.current.condition.icon,
      temp:
        units === "C" ? currentData.current.temp_c : currentData.current.temp_f,
      feelsLike: currentData.current.feelslike_c,
      humidity: currentData.current.humidity,
      windSpeed: currentData.current.wind_kph,
      precipChance:
        currentData.forecast.forecastday[0].day.daily_chance_of_rain,
    };

    return currentDayInfo;
  } catch (err) {
    console.error(err);
  }
}

export async function getForecastInfo(units, initialLoad = false) {
  const url = getUrl(initialLoad);

  try {
    const forecastData = await weather.getWeatherData(url);
    const days = forecastData.forecast.forecastday;
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
      return forecastInfo.sort((a, b) => a.dayNum - b.dayNum);
    }
  } catch (err) {
    console.error(err);
  }
}
