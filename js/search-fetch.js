import { flagCardDisplay } from "./data-fill.js";
import { clearFlags } from "./clear-flags.js";

const form = document.querySelector("#flag-form");
const countryName = document.querySelector("#country-search");

export const searchFetch = async () => {
  try {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const countryNameValue = countryName.value.trim().toLowerCase(); 
      const URL = `https://restcountries.com/v3.1/name/${countryNameValue}`;

      const response = await fetch(URL, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        // checking if the data is an array and if the data length is greater than 0
        if (Array.isArray(data) && data.length > 0) {
          // Clear previous flags before populating search result flags
          clearFlags();
          // output the flagCardDisplay of the search result flags
          data.forEach(item => {
            flagCardDisplay(item);
          });
        } else {
          // If no results found, clear flags
          clearFlags();
          console.log("No matching countries found.");
        }
      } else {
        console.error("Failed to fetch country data.");
      }
    });
  } catch (error) {
    console.error(`There has been an error ${error}`);
  }
};
