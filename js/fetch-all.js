import { flagCardDisplay } from "./data-fill.js";

// Variable to store fetched data
let allCountriesData = null;

// Fetch all countries data
export const fetchFlags = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const response = await fetch(URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  
    allCountriesData = await response.json();

    if (!Array.isArray(allCountriesData)) {
      throw new Error(`Invalid data received from API: ${allCountriesData}`);
    }

    // Sort all countries data alphabetically by country name
    alphaOrder(allCountriesData);
    displayFlags(allCountriesData);
    return allCountriesData;
  } catch (error) {
    console.error(`Error fetching all countries data: ${error}`)
  }
}

export { allCountriesData };

// Search functionality
const countryName = document.querySelector("#country-search");
export const searchFetch = async () => {
  try {
    countryName.addEventListener("input", async () => {
      const countryNameValue = countryName.value.trim().toLowerCase(); 

      if (!allCountriesData) {
        console.error("All countries data not fetched yet.");
        return;
      }

      // Filter data based on search query
      const filteredData = allCountriesData.filter(item => {
        const countryName = item.name.common.toLowerCase();
        return countryName.startsWith(countryNameValue);
      });

      // Sort filtered data alphabetically by country name
      alphaOrder(filteredData);

      // Display filtered data
      clearFlags();
      displayFlags(filteredData);
    });
  } catch (error) {
    console.error(`There has been an error ${error}`);
  }
};


// Region fetch
export const regionFlags = async () => {
  try {
    const regionSelect = document.querySelector("#flag-region");

    regionSelect.addEventListener("change", () => {
      const regionOutput = regionSelect.value.toLowerCase();

      if (!allCountriesData) {
        console.error("All countries data not fetched yet.");
        return;
      }

      // Filter data based on selected region
      const filteredData = allCountriesData.filter(item => {
        const itemRegion = item.region?.toLowerCase() || ""; // Handle cases where region is null
        return itemRegion === regionOutput;
      });

      // Sort filtered data alphabetically by country name
      alphaOrder(filteredData);

      // Display filtered data
      clearFlags();
      displayFlags(filteredData);
    });
  } catch (error) {
    console.error(`There has been an error: ${error}`);
  }
};

// Alphabetize Flags

const alphaOrder = (filteredData) => {
  filteredData.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

// Clear flags
const clearFlags = () => {
  const flagContainer = document.querySelector("#flag-output-container");
  flagContainer.innerHTML = '';
};

// Display flags
const displayFlags = (data) => {
  data.forEach(item => {
    flagCardDisplay(item);
  });
};

// Fetch all countries data when the module is loaded
fetchFlags();