import createMenu from "../components/createNavbar.js";
import { displayMessage } from "../components/displayMessage.js";
import { baseUrl, articleKey } from "../constants/api.js";
import { getToken, getUsername } from "../utils/storage.js";
import { deleteProduct } from "../components/deleteProduct.js";
import redirect from "../constants/redirect.js";

// import { deleteArticle } from "./utilis/articles/deleteArticle.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// if no article id in String, return to home
if (!id) {
  location.href = "/";
}

const username = getUsername();
if (!username) {
  location.href = "/";
}

const form = document.querySelector(".form-edit-product");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const idInput = document.querySelector("#id");
const summary = document.querySelector("#summary");

(async function () {
  try {
    const response = await fetch(baseUrl + articleKey + id);
    const result = await response.json();
    document.title = "Edit" + result.title;
    title.value = result.title;
    author.value = result.author;
    idInput.value = result.id;
    summary.value = result.summary;

    deleteProduct(id);
  } catch (error) {
    displayMessage(
      "error",
      "Error:There was an error getting the product",
      ".message-container"
    );
  } finally {
    form.style.display = "block";
    // loader.style.display = "none";
  }
})();

form.addEventListener("submit", submitChange);
// Submit changes made to article on click
function submitChange(event) {
  event.preventDefault();
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  const idInputValue = idInput.value;

  if (
    titleValue.length === 0 ||
    authorValue.length === 0 ||
    summaryValue.length <= "5"
  ) {
    return createMessage(
      "warning",
      "Check your values. Remember: summary has to be longer than 5 characters",
      ".message-container"
    );
  }
  updateProduct(titleValue, authorValue, idInputValue, summaryValue);
}

// update changes to article
async function updateProduct(title, author, id, summary) {
  const url = baseUrl + articleKey + id;
  // create data
  const data = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });
  const token = getToken();

  const options = {
    method: "PUT",
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
    if (result.updated_at) {
      displayMessage(
        "success",
        "Your article has been updated! You will be redirected to edit page",
        ".message-container"
      );
      redirect();
    }
    if (result.error) {
      displayMessage("error", result.message, ".message-container");
    }
  } catch (error) {
    // console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
