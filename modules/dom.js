import { getCurrentTemp } from './weatherApi'

export default function dom() {
  const locationInput = document.getElementById("search-location");
  const locationForm = document.getElementById("form");
  const tempDisplay = document.getElementById("temp-display")

  locationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = locationInput.value

    tempDisplay.innerText = getCurrentTemp(location, "temp_c")
    console.log(getCurrentTemp(location, null))
  })
}
