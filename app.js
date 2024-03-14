import { fetchFlags, regionFlags, searchFetch } from "./js/fetch-all.js";
import { darkMode } from "./js/dark-mode.js";

const init = () => {
  darkMode();
  fetchFlags();
  regionFlags();
  searchFetch();
}

init();