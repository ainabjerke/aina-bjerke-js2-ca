import { baseUrl, urlKey } from "./constants/api.js";
import { createHTML } from "./components/createHTML.js";
import { searchProducts } from "./components/searchProducts.js";
import { displayMessage } from "./components/displayMessage.js";
import createMenu from "./components/createNavbar.js";

// const url = baseUrl + urlKey;

createMenu();
// Fetch API
async function fetchAPI() {
  try {
    const url = baseUrl + urlKey;
    const response = await fetch(url);
    const product = await response.json();
    // const productList = product ;
    // productArticles(productList);
    // console.log(product);
    createHTML(product);
    searchProducts(product);
  } catch (error) {
    // console.log(error);
    displayMessage("error", error, ".product-container");
  }
}

fetchAPI();
