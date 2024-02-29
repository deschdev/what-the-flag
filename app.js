import { fetchFlags } from "./js/fetch-all.js";
import { regionFlags } from "./js/region-fetch.js";
import { searchFetch } from "./js/search-fetch.js";

const init = () => {
  fetchFlags();
  regionFlags();
  searchFetch();
}

init();