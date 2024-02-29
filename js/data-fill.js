const outputContainer = document.querySelector("#flag-output-container");

export const flagCardDisplay = (data) => {
  const flagCardContainer = document.createElement("a");
  // flagCardContainer.href = modal();
  flagCardContainer.className = "flag-card";
  flagCardContainer.innerHTML = `
    <img src=" ${data?.flags?.png}" alt=" ${data?.flags?.alt}">
    <div class="flag-card-text-container">
      <h2> ${data?.name?.common}</h2>
      <h3><strong>Population:</strong> ${data?.population.toLocaleString()}</h3>
      <h3><strong>Region:</strong> ${data?.region}</h3>
      <h3><strong>Capital:</strong> ${data?.capital}</h3>
    </div>
  `
  outputContainer.appendChild(flagCardContainer);
}

const modal = () => {
  console.log("Norman")
}