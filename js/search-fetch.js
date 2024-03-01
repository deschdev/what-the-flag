import { flagCardDisplay } from "./data-fill.js";
import { clearFlags } from "./clear-flags.js";

const form = document.querySelector("#flag-form");
const countryName = document.querySelector("#country-search");

export const searchFetch = async () => {
  try {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const countryNameValue = countryName.value.trim().toLowerCase(); 

      // Check for empty search query
      if (countryNameValue === "" || countryNameValue.length < 3) {
        console.warn("Empty search query. Please enter a country name.");
        return;
      }

      const URL = `https://restcountries.com/v3.1/name/${countryNameValue}`;
      const response = await fetch(URL, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();

        // validate the received data
        if (!Array.isArray(data)) {
          throw new Error(`Invalid data received from API: ${data}`);
        }

        if (data.length === 0) {
          clearFlags();
          console.log("No countries found");
          // Note: display a message to the user
        } else {
          // clear previous flags and display the search results
          clearFlags();
          data.forEach(item => {
            flagCardDisplay(item)
          });
        }
      } else {
        console.error("Failed to fetch country data.");
      }
    });
  } catch (error) {
    console.error(`There has been an error ${error}`);
  }
};
