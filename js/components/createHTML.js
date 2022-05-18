import { displayMessage } from "./displayMessage.js";
import { emptyFilter } from "../constants/messages.js";
import { getExistingFavs, saveFavs } from "../utils/storage.js";
// import saveFavs from "../utils/saveFavourites.js";

// let favorites = getFromStorage(articleKey);

export function createHTML(products) {
  const productContainer = document.querySelector(".product-container");

  const favorites = getExistingFavs();
  productContainer.innerHTML = "";

  if (products.length === 0) {
    displayMessage("", emptyFilter, ".product-container");
  }

  products.forEach(function (product) {
    let cssClass = "fa-regular";
    //check trugh the favorites array
    //does the item id exisit in the favorite array
    const doesObjectExist = favorites.find(function (fav) {
      // console.log(fav);
      return parseInt(fav.id) === product.id;
    });

    // console.log(doesObjectExist);

    //if it is in the array, change the style of i element
    if (doesObjectExist) {
      cssClass = "fa-solid";
    }

    productContainer.innerHTML += `
            <div class="product">
            <i class="${cssClass} fa-heart"
            data-id="${product.id}"
            data-title="${product.title}"
            data-author="${product.author}"
            data-summary="${product.summary}">
            </i>
                <h4>${product.title}</h4>
                <p>${product.author}</p>
                <p>${product.summary}</p>
            </div>
        `;
  });

  const favButtons = document.querySelectorAll(".product i");

  // console.log(favButtons);
  for (var i = 0; i < favButtons.length; i++) {
    favButtons[i].addEventListener("click", function (e) {
      this.classList.toggle("fa-solid");
      this.classList.toggle("fa-regular");

      const title = this.dataset.title;
      const id = this.dataset.id;
      const author = this.dataset.author;
      const summary = this.dataset.summary;

      const currentFavs = getExistingFavs();
      // console.log(currentFavs);

      //find item in currentFavs
      const productExist = currentFavs.find(function (fav) {
        return fav.id === id;
      });

      // console.log("productExsist", productExist);
      //item is not in the current Favs
      //add it
      if (productExist === undefined) {
        const product = {
          title: title,
          id: id,
          author: author,
          summary: summary,
        };

        currentFavs.push(product);

        saveFavs(currentFavs);
      } else {
        //item in the currentfav
        //remove it
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
        // handleStorage(e.target.dataset.id);
        // console.log(handleStorage);
      }
    });
  }
}

// export function createHTML(products) {
//   const productContainer = document.querySelector(".product-container");

//   const favorites = getExistingFavs();
//   productContainer.innerHTML = "";

//   if (products.length === 0) {
//     displayMessage("", emptyFilter, ".product-container");
//   }

//   products.forEach(function (product) {

//     let cssClass = "fa-regular";
//     //check trugh the favorites array
//     //does the item id exisit in the favorite array
//     const doesObjectExist = favorites.find(function (fav) {
//       console.log(fav);
//       return parseInt(fav.id) === product.id;

//     });

//     console.log(doesObjectExist);

//     //if it is in the array, change the style of i element
//     if (doesObjectExist) {
//       cssClass = "fa-solid";
//     }

//     productContainer.innerHTML += `
//             <div class="product">
//             <i class="${cssClass} fa-heart"
//             data-id="${product.id}"
//             data-title="${product.title}"
//             data-author="${product.author}"
//             data-summary="${product.summary}">
//             </i>
//                 <h4>${product.title}</h4>
//                 <p>${product.author}</p>
//                 <p>${product.summary}</p>
//             </div>
//         `;
//   });

//   const favButtons = document.querySelectorAll(".product i");
//   console.log(favButtons);
//   for (var i = 0; i < favButtons.length; i++) {
//     favButtons[i].addEventListener("click", function (e) {
//       this.classList.toggle("fa-solid");
//       this.classList.toggle("fa-regular");

//       const title = this.dataset.title;
//       const id = this.dataset.id;
//       const author = this.dataset.author;
//       const summary = this.dataset.summary;

//       const currentFavs = getExistingFavs();
//       console.log(currentFavs);

//       //find item in currentFavs
//       const productExist = currentFavs.find(function (fav) {
//         return fav.id === id;
//       });

//       console.log("productExsist", productExist);
//       //item is not in the current Favs
//       //add it
//       if (productExist === undefined) {
//         const product = {
//           title: title,
//           id: id,
//           author: author,
//           summary: summary,
//         };

//         currentFavs.push(product);

//         saveFavs(currentFavs);
//       } else {
//         //item in the currentfav
//         //remove it
//         const newFavs = currentFavs.filter((fav) => fav.id !== id);
//         saveFavs(newFavs);
//       }
//     });
//   }
// }
