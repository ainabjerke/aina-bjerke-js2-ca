import { displayMessage } from "../components/displayMessage.js";
import { baseUrl, articleKey } from "../constants/api.js";
import { getToken } from "../utils/storage.js";
import redirect from "../constants/redirect.js";

export function deleteProduct(id) {
  const deleteButton = document.querySelector(".delete-btn");
  deleteButton.addEventListener("click", deleteHandler);

  function deleteHandler() {
    (async function () {
      const productToDelete = confirm("Are you sure you want to delete this?");

      // If user clicks yes on confirm message
      if (productToDelete) {
        // Get article url
        const url = baseUrl + articleKey + id;
        const token = getToken();

        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          console.log(result);
          displayMessage(
            "success",
            "Article successfully deleted!You will be redirected to edit page",
            ".message-container"
          );

          redirect();
        } catch (error) {
          displayMessage("error", "An Error has occured", ".message-container");
        }
      }
    })();
  }
}
