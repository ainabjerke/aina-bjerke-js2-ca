import createMenu from "./createNavbar.js";
import { displayMessage } from "./displayMessage.js";
import { baseUrl, articleKey } from "../constants/api.js";
import { getToken, getUsername } from "../utils/storage.js";

createMenu();

const form = document.querySelector(".form-add-product");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");

const username = getUsername();
if (!username) {
  location.href = "/";
}

form.addEventListener("submit", submitProduct);

export function submitProduct(event) {
  event.preventDefault();
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  if (
    titleValue.length === 0 ||
    authorValue.length === 0 ||
    summaryValue.length <= "5"
  ) {
    return displayMessage(
      "warning",
      "Check your values. Remember: summary has to be longer than 5 characters",
      ".message-container"
    );
  }
  addProduct(titleValue, authorValue, summaryValue);
}

async function addProduct(title, author, summary) {
  const url = baseUrl + articleKey;
  const token = getToken();
  // create article data
  const data = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    if (result.created_at) {
      displayMessage(
        "success",
        "Your article has been created! Window will refresh shortly",
        ".message-container"
      );
      form.reset();
      window.setTimeout(function () {
        location.reload();
      }, 2500);
    }

    if (result.error) {
      displayMessage("error", result.message, ".message-container");
    }
  } catch (error) {
    displayMessage("error", "An error occured", ".message-container");
    console.log(error);
  }
}

// Get list of articles to edit

(async function () {
  const response = await fetch(baseUrl + articleKey);
  const result = await response.json();
  // console.log(result);
  const productList = document.querySelector(".collection");

  result.forEach((products) => {
    productList.innerHTML += `
      <li >
          <h4 >${products.title}</h4>
          <p >${products.author}<p>
          <p>${products.summary}</p>
          <a class="button edit-button" href="editProduct.html?id=${products.id}">Edit</a>
      </li>`;
  });
})();

// (async function () {
//   const Url = `http://localhost:1337`;
//   const response = await fetch(Url + "/articles");
//   const result = await response.json();
//   console.log(result);
//   const articleList = document.querySelector(".collection");

//   result.forEach((article) => {
//     articleList.innerHTML += `
//     <li class="box collection-item is-flex is-flex-direction-column is-justify-content-space-between ">
//         <h4 class="is-size-4">${article.title}</h4>
//         <p class="is-italic mb-2">${article.author}<p>
//         <p>${article.summary}</p>
//         <a class="button is-info mt-1 is-align-self-flex-end edit-button" href="editArticle.html?id=${article.id}">Edit</a>
//     </li>`;
//   });
// })();

// import { baseUrl } from "../constants/api.js";
// import { displayMessage } from "../components/displayMessage.js";
// import createMenu from "../components/createNavbar.js";
// import { getToken, getUsername } from "../utils/storage.js";

// createMenu();

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id");

// const username = getUsername();
// if (!username) {
//   location.href = "/";
// }

// const message = document.querySelector(".message-container");
// const form = document.querySelector("form");
// const title = document.querySelector("#title");
// const author = document.querySelector("#author");
// const summary = document.querySelector("#summary");
// const idInput = document.querySelector("#id");
// const loading = document.querySelector(".loading");

// (async function () {
//   try {
//     const response = await fetch(baseUrl + "/articles/" + id);
//     const details = await response.json();
//     console.log(details);

//     title.value = details.title;
//     author.value = details.author;
//     summaryvalue = details.summary;
//     idInput.value = details.id;

//     console.log(details);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loading.style.display = "none";
//     form.style.display = "block";
//   }
// })();

// form.addEventListener("submit", submitForm);

// function submitForm(event) {
//   event.preventDefault();

//   message.innerHTML = "";

//   const titleValue = title.value.trim();
//   const authorValue = author.value.trim();
//   const summaryValue = summary.value.trim();
//   const idValue = idInput.value;

//   if (
//     titleValue.length === 0 ||
//     authorValue.length === 0 ||
//     summaryValue.length === 0
//   ) {
//     return displayMessage(
//       "warning",
//       "Please supply proper values",
//       ".message-container"
//     );
//   }

//   updateProduct(titleValue, authorValue, summaryValue, idValue);
// }

// async function updateProduct(title, author, summary, id) {
//   const url = baseUrl + "/articles";
//   const data = JSON.stringify({
//     title: title,
//     author: author,
//     summary: summary,
//   });

//   const token = getToken();

//   const options = {
//     method: "PUT",
//     body: data,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();
//     console.log(json);

//     if (json.updated_at) {
//       displayMessage("success", "Product updated", ".message-container");
//     }

//     if (json.error) {
//       displayMessage("error", json.message, ".message-container");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// // Get list of articles to edit
// (async function () {
//   const response = await fetch(baseUrl + "/articles");
//   const result = await response.json();
//   const articleList = document.querySelector(".collection");

//   result.forEach((article) => {
//     articleList.innerHTML += `
//       <li class="box collection-item is-flex is-flex-direction-column is-justify-content-space-between ">
//           <h4 class="is-size-4">${article.title}</h4>
//           <p class="is-italic mb-2">${article.author}<p>
//           <p>${article.summary}</p>
//           <a class="button is-info mt-1 is-align-self-flex-end edit-button" href="editArticle.html?id=${article.id}">Edit</a>
//       </li>`;
//   });
// })();

// import { baseUrl } from "./settings/api.js";
// import displayMessage from "./components/common/displayMessage.js";
// import createMenu from "./components/common/createMenu.js";
// import { getToken } from "./utils/storage.js";

// createMenu();

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id");

// if (!id) {
//   document.location.href = "/";
// }

// const productUrl = baseUrl + "products/" + id;

// const form = document.querySelector("form");
// const name = document.querySelector("#name");
// const price = document.querySelector("#price");
// const description = document.querySelector("#description");
// const idInput = document.querySelector("#id");
// const message = document.querySelector(".message-container");
// const loading = document.querySelector(".loading");

// (async function () {
//   try {
//     const response = await fetch(productUrl);
//     const details = await response.json();

//     name.value = details.name;
//     price.value = details.price;
//     description.value = details.description;
//     idInput.value = details.id;

//     console.log(details);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loading.style.display = "none";
//     form.style.display = "block";
//   }
// })();

// form.addEventListener("submit", submitForm);

// function submitForm(event) {
//   event.preventDefault();

//   message.innerHTML = "";

//   const nameValue = name.value.trim();
//   const priceValue = parseFloat(price.value);
//   const descriptionValue = description.value.trim();
//   const idValue = idInput.value;

//   if (
//     nameValue.length === 0 ||
//     priceValue.length === 0 ||
//     isNaN(priceValue) ||
//     descriptionValue.length === 0
//   ) {
//     return displayMessage(
//       "warning",
//       "Please supply proper values",
//       ".message-container"
//     );
//   }

//   updateProduct(nameValue, priceValue, descriptionValue, idValue);
// }

// async function updateProduct(name, price, description, id) {
//   const url = baseUrl + "products/" + id;
//   const data = JSON.stringify({
//     name: name,
//     price: price,
//     description: description,
//   });

//   const token = getToken();

//   const options = {
//     method: "PUT",
//     body: data,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();
//     console.log(json);

//     if (json.updated_at) {
//       displayMessage("success", "Product updated", ".message-container");
//     }

//     if (json.error) {
//       displayMessage("error", json.message, ".message-container");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
