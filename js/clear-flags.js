export const clearFlags = () => {
  // Select the container element containing the flags
  const flagContainer = document.querySelector("#flag-output-container");
  // Remove all child elements (flags)
  flagContainer.innerHTML = '';
};