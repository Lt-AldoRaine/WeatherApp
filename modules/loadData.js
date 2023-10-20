import * as weather from "./weatherApi";

let locationName = "";
let recentLocation = locationName;

function getUrl(initialLoad = false) {
  try {
    const formInput = weather.getFormInput();

    if (initialLoad) {
      locationName = "New York";
      recentLocation = locationName;
    } else if (formInput !== "") {
      locationName = formInput;
    } else locationName = recentLocation;

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
    console.log(currentData);

    const currentDayInfo = {
      city: currentData.location.name,
      region: currentData.location.region,
      country: currentData.location.country,
      // prettier-ignore
      time: new Date(currentData.location.localtime).toLocaleTimeString("en-us"),
      date: new Date(
        currentData.forecast.forecastday[0].date,
      ).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      condition: currentData.current.condition.text,
      condIcon: currentData.current.condition.icon,
      temp:
        units === "C" ? currentData.current.temp_c : currentData.current.temp_f,
      feelsLike:
        units === "C"
          ? currentData.current.feelslike_c
          : currentData.current.feelslike_f,
      humidity: currentData.current.humidity,
      windSpeed: currentData.current.wind_kph,
      precipChance:
        currentData.forecast.forecastday[0].day.daily_chance_of_rain,
    };

    console.log(currentDayInfo);
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
      const maxTemp =
        units === "C" ? days[i].day.maxtemp_c : days[i].day.maxtemp_f;
      const minTemp =
        units === "C" ? days[i].day.mintemp_c : days[i].day.mintemp_f;

      const dayInfo = {
        conditionIcon: days[i].day.condition.icon,
        dayOfWeek: dayOfWeek,
        dayNum: dayNum,
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
