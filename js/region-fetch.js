import { flagCardDisplay } from "./data-fill.js"

// fetch by region
export const regionFlags = async () => {
  try {   
    const regionSelect = document.querySelector("#flag-region");
    // Initialize with the current value
    let regionOutput = regionSelect.value.toLowerCase();
    
    regionSelect.addEventListener("change", async () => {
      //clear previous flags
      clearFlags();
      // update the region output when the select value changes
      regionOutput = regionSelect.value.toLowerCase();
      // fetch display flags for the new region
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
    // Filter the data based on the regionOutput
    const filteredData = data.filter(item => {
      const itemRegion = item.region.toLowerCase();
      const selectedRegion = regionOutput.toLowerCase();
      return itemRegion === selectedRegion;
    });

    // Output the filtered items
    filteredData.forEach(item => {
      filteredData.push(flagCardDisplay(item))
    });
  } catch (error) {
    console.error(`There has been an error: ${error}`);
  }
};

const clearFlags = () => {
  // Select the container element containing the flags
  const flagContainer = document.querySelector("#flag-output-container");
  // Remove all child elements (flags)
  flagContainer.innerHTML = '';
};