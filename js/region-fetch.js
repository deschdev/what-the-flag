import { flagCardDisplay } from "./data-fill.js";
import { clearFlags } from "./clear-flags.js";

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