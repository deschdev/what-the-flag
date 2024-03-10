import { fetchFlags, regionFlags, searchFetch } from "./js/fetch-all.js";

const init = () => {
  fetchFlags();
  regionFlags();
  searchFetch();
}

init();