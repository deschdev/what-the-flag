import { flagCardDisplay } from "./data-fill.js"

const form = document.querySelector("#flag-form");
const countryName = document.querySelector("#country-search");

// fetch by search
export const searchFetch = async () => {
  try {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const countryNameValue = countryName.value.toLowerCase();
      const URL = `https://restcountries.com/v3.1/name/${countryNameValue}`;

      const response = await fetch(URL, {
        method: "GET"
      });
      const data = await response.json();
      data.forEach(item => {
        console.log("Item Name:", item?.name?.common);
        const itemName = String(item?.name?.common).toLowerCase();
        console.log("Item Name (Lowercase):", itemName);
        if (itemName.includes(countryNameValue)) {
          console.log("Item Name (Lowercase):", itemName);
          flagCardDisplay(item);
        }
      });
    });
  } catch (error) {
    console.error(`There has been an error ${error}`)
  }
}