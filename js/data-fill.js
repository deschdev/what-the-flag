const outputContainer = document.querySelector("#flag-output-container");

export const flagCardDisplay = (data) => {
  // creating the clickable flag cards instead of sending the user to a new page
  const flagCardContainer = document.createElement("a");
  flagCardContainer.href = "#";
  flagCardContainer.className = "flag-card";
  flagCardContainer.innerHTML = `
    <img src="${data?.flags?.png}" alt="${data?.flags?.alt}">
    <div class="flag-card-text-container">
      <h2>${data?.name?.common}</h2>
      <h3><strong>Population:</strong> ${data?.population.toLocaleString()}</h3>
      <h3><strong>Region:</strong> ${data?.region}</h3>
      <h3><strong>Capital:</strong> ${data?.capital}</h3>
    </div>
  `
  // appending the flagCardContainer to the outputContainer
  outputContainer.appendChild(flagCardContainer);

  // Attach event listener to open modal when flag card is clicked
  flagCardContainer.addEventListener("click", () => {
    openModal(data);
  });
}

const openModal = (data) => {
  const modalContainer = document.createElement("section");
  modalContainer.id = "flag-modal";
  modalContainer.className = "modal";
  modalContainer.innerHTML = `
    <button><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#11517" d="M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9 .8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3 .8 33.9s-24.3 9.9-33.9 .8l-176-168z"/></svg>Back</button>
    <div class="modal-container">
      <img src="${data?.flags?.png}" alt=" ${data?.flags?.alt}">
      <div class="country-information-container">
        <h2>${data?.name?.common}</h2>
        <ul>
          <li><h3><strong>Native Name:</strong> ${data?.altSpellings[1]}</h3></li>
          <li><h3><strong>Population:</strong> ${data?.population.toLocaleString()}</h3></li>
          <li><h3><strong>Region:</strong> ${data?.region}</h3></li>
          <li><h3><strong>Sub Region:</strong> ${data?.subregion}</h3></li>
          <li><h3><strong>Capital:</strong> ${data?.capital}</h3></li>
          <li><h3><strong>Top Level Domain:</strong> ${data?.tld[0]}</h3></li>
          <li><h3><strong>Currencies:</strong> ${getCurrencyInfo(data?.currencies)}</h3></li>
          <li><h3><strong>Languages:</strong> ${getLanguages(data?.languages)}</h3></li>
        </ul>
        <div class="border-countries-container">
          <h3><strong>Border Countries:</strong></h3>
          <div class="badge-container">
            <span>${getBorderCountries(data?.borders)}</span>
          </div>
        </div>
    </div>
  `;
  outputContainer.appendChild(modalContainer);

  // Close modal when close button is clicked
  const closeModalButton = modalContainer.querySelector("button");
  closeModalButton.addEventListener("click", () => {
    modalContainer.remove();
  });
};

const getCurrencyInfo = (currencies) => {
  // Extracts the first currency code from the object's keys
  const currencyCode = Object.keys(currencies)[0];
  // Retrieves the currency information using the extracted code
  const currencyInfo = currencies[currencyCode];
  // Returns a formatted string with currency name, code, and symbol
  return `${currencyInfo.name} (${currencyCode}), Symbol: ${currencyInfo.symbol}`;
};

const getLanguages = (languages) => {
  // Converts object values (language names) into an array
  const languageNames = Object.values(languages);
  // Joins the language names into a comma-separated string
  return languageNames.join(", ");
};

// re-think the getBorderCountries to render button instead of a joined list of text.
// border countries
const getBorderCountries = (borders) => {
  // if there are no borders or the borders length is 0 then add none as the text
  if (!borders || borders.length === 0) {
    return "None, this country is an island.";
  }

  // attempting to update the border countries abbreviated name
  const borderNames = borders.map(border => {
    const countryData = borders.find(country => country.fifa === border);
    return countryData ? `<span>${countryData.name.common}</span>` : border;
  });
  return borderNames.join(", ");
};
