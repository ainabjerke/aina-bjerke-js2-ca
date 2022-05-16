import { url } from "./constants/api.js";
import { createHTML } from "./components/createHTML.js";
import { searchProducts } from "./components/searchProducts.js";
import { displayMessage } from "./components/displayMessage.js";

// const url = baseUrl + urlKey;

// Fetch API
async function fetchAPI() {
  try {
    // const url = baseUrl + urlKey;
    const response = await fetch(url);
    const product = await response.json();
    console.log(product);
    createHTML(product);
    searchProducts(product);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
}

fetchAPI();
