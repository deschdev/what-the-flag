import { flagCardDisplay } from "./data-fill.js";

// use the all api call for everything - remove the other network calls.


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

// search functionality
const form = document.querySelector("#flag-form");
const countryName = document.querySelector("#country-search");

export const searchFetch = async () => {
  try {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const countryNameValue = countryName.value.trim().toLowerCase(); 


      // use the filter higher order function instead of the length
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

// region fetch
// create the custom select and have the real select show below!

// fetch by region
export const regionFlags = async () => {
  try {   
    const regionSelect = document.querySelector("#flag-region");
    // Initialize with the current value
    let regionOutput = regionSelect.value.toLowerCase();

    // fetch display flags for the new region
    await fetchAndDisplayFlags(regionOutput);
    
    regionSelect.addEventListener("change", async () => {
      //clear previous flags
      clearFlags();
      // update the region output when the select value changes
      regionOutput = regionSelect.value.toLowerCase();
      await fetchAndDisplayFlags(regionOutput);
    });

  } catch (error) {
    console.error(`There has been an error: ${error}`);
  }
};

const fetchAndDisplayFlags = async (regionOutput) => {
  try {
    const URL = `https://restcountries.com/v3.1/region/${regionOutput}`;
    const response = await fetch(URL, {
      method: "GET"
    });
    const data = await response.json();

    // validate received data
    if (!Array.isArray(data)) {
      throw new Error(`Invalid data received from API: ${data}`)
    }

    // Filter the data based on the regionOutput
    const filteredData = data.filter(item => {
      const itemRegion = item.region.toLowerCase();
      const selectedRegion = regionOutput.toLowerCase();
      return itemRegion === selectedRegion;
    });

    // Output the filtered items
    filteredData.forEach(item => {
      flagCardDisplay(item);
    });

  } catch (error) {
    console.error(`There has been an error: ${error}`);
  }
};

// clear

const clearFlags = () => {
  // Select the container element containing the flags
  const flagContainer = document.querySelector("#flag-output-container");
  // Remove all child elements (flags)
  flagContainer.innerHTML = '';
};
