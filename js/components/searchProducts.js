import { createHTML } from "./createHTML.js";

export function searchProducts(products) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value;

    const filteredProducts = products.filter(function (product) {
      if (product.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    createHTML(filteredProducts);
  };
}
