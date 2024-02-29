import { flagCardDisplay } from "./data-fill.js"


// fetch all
export const fetchFlags = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const response = await fetch(URL, {
      method: "GET"
    });
    const data = await response.json();
    data.forEach(item => {
      // displays all flags
      console.log(item)
      flagCardDisplay(item);
    })
  } catch (error) {
    console.error(`there has been an error ${error}`)
  }
}