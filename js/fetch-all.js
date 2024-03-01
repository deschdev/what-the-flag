import { flagCardDisplay } from "./data-fill.js"


// fetch all
export const fetchFlags = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const response = await fetch(URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(`Invalid data received from API: ${data}`);
    }

    data.forEach((item) => {
      // displays all flags
      console.log(item)
      flagCardDisplay(item);
    });
  } catch (error) {
    console.error(`Error fetching flags: ${error}`)
  }
}