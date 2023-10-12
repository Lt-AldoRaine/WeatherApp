export const getFormInput = () => {
  const locationInput = document.getElementById("search-location");
  const locationName = locationInput.value;

  const regex = /(.*?),\s*(.*)/;
  const match = locationName.match(regex);

  if (match) {
    const city = match[1].trim();
    const region = match[2] ? match[2].trim() : '';
    const formattedLocation = region ? `${city}, ${region}` : city;


    console.log(formattedLocation)
    return formattedLocation
  } else {
    console.log("Invalid input");
    return '';
  };

}

export async function getRequestUrl(location) {
  return `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}
    &q="${location}"&days=7`, { mode: "cors" };
}

async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();

  return weatherData;
}

export async function getCurrentTemp(url, tempType) {
  const weatherData = await getWeatherData(url);
  const currentTemp = weatherData.current;

  if (tempType = "F") {
    currentTemp = weatherData.temp_f;
  } 

  if (tempType = "C") {
    currentTemp = weatherData.temp_c;
  }

  return currentTemp;
}

export async function getForecastData(url, tempType) {
  

}

