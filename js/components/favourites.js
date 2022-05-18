import { getExistingFavs, clearStorage } from "../utils/storage.js";
import favMessage from "../constants/FavMessage.js";
// import { clearStorage } from "../utils/favFunction.js";
import createMenu from "../components/createNavbar.js";

createMenu();

const favorites = getExistingFavs();

const productContainer = document.querySelector(".product-container");

if (favorites.length === 0) {
  productContainer.innerHTML = favMessage.emptyFavList;
}
// console.log(productContainer);

favorites.forEach((favorite) => {
  productContainer.innerHTML += `
    <div class="product">
              
              <i class="fa-solid fa-heart"></i>
              <p>${favorite.title}</p>
              <p>${favorite.id}</p>
              <p>${favorite.author}</p>
              <p>${favorite.summary}</p>
              </div>`;
});

const button = document.querySelector(".clear-button");
button.addEventListener("click", clearButton);

function clearButton() {
  clearStorage("favourites");
  productContainer.innerHTML = "<p>You have no favourites</p>";
}
