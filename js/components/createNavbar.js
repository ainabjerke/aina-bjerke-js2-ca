import { getUsername, clearStorage } from "../utils/storage.js";
// import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;
  // console.log(pathname);

  const navContainer = document.querySelector(".menu-container");

  const username = getUsername();
  // console.log(username);

  //code for if user is not logged in
  let authLink = `<a href="login.html" class="navbar-item${
    pathname === "/login.html" ? "active" : ""
  }">Login</a> `;

  //code for if user is logged in
  if (username) {
    authLink = `<a href="edit.html" class="navbar-item 
    ${pathname === "/edit.html" ? "active" : ""}">Edit</a>
   <span>Logged in as: ${username}</span>
    <button id="logout-btn">Logout</button>`;
  }

  navContainer.innerHTML = `<div class="menu">
                        <a href="/" class="${
                          pathname === "/" || pathname === "/index.html"
                            ? "active"
                            : ""
                        }">Home</a>
                        <a href="favourites.html" class="${
                          pathname === "/favourites.html" ? "active" : ""
                        }"> Favourites </a>
                        ${authLink}
                          </div>`;

  const logoutButton = document.querySelector("#logout-btn");
  if (logoutButton) {
    logoutButton.onclick = () => {
      const doLogout = confirm("Are you sure?");
      if (doLogout) {
        clearStorage("user");
        clearStorage("token");
        location.href = "/login.html";
      }
    };
  }
}
