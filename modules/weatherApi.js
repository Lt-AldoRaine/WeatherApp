export const getFormInput = () => {
  const locationInput = document.getElementById("search-location");
  const locationName = locationInput.value.toLowerCase();

  const regex = /^(.*?)(?:,\s*(.*))?$/;
  const match = locationName.match(regex);

  if (match) {
    const city = match[1].trim();
    const region = match[2] ? match[2].trim() : "";
    const formattedLocation = region ? `${city}, ${region}` : city;

    console.log(formattedLocation);
    return formattedLocation;
  } else {
    console.log("Invalid input");
    return "";
  }
};

export function getRequestUrl(location) {
  // prettier-ignore
  return `http://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_API_KEY}&q="${location}"&days=7`;
}

export async function getWeatherData(url) {
  try {
    console.log(url);
    const response = await fetch(url);
    const weatherData = await response.json();

    return weatherData;
  } catch (err) {
    console.error(err);
  }
}
