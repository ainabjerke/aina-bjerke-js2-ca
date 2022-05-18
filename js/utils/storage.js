import { createHTML } from "../components/createHTML.js";
import { displayMessage } from "../components/displayMessage.js";
import { baseUrl, urlKey } from "../constants/api.js";
import { articleKey, tokenKey, userKey } from "../constants/key.js";

// let favorites = getFromStorage(articleKey);
// console.log(favorites);

// export async function handleStorage(id) {
//   const url = baseUrl + urlKey + id;

//   try {
//     const response = await fetch(url);
//     const article = await response.json();
//     console.log(article);

//     // check if favs is empty and blindly add to storage
//     if (favorites.length === 0) {
//       favorites.push(article);
//       saveToStorage(articleKey, favorites);
//     } else {
//       // return id and push article to array
//       const doesExist = favorites.find(function (fav) {
//         return fav.id.toString() === id;
//       });

//       if (doesExist === undefined) {
//         favorites.push(article);
//         saveToStorage(articleKey, favorites);
//       } else {
//         // remove article from local storage and make sure html is rendered again only in favorites
//         updateStorage(id);
//         const existingList = getFromStorage(articleKey);
//         const pathname = "/favorites.html";

//         if (existingList.length === 0 && location.pathname === pathname) {
//           displayMessage(
//             "warning",
//             "You have removed all favorites",
//             ".message-container"
//           );
//           document.querySelector(".clear-button").style.display = "none";
//         }
//         if (location.pathname === pathname) {
//           createHTML(existingList);
//         }
//       }
//     }
//   } catch (error) {
//     displayMessage(
//       "error",
//       "Opps, something went wrong. Error: " + error + "<br>Please reload page",
//       ".message-container"
//     );
//   }
// }

// export function updateStorage(id) {
//   const filteredList = favorites.filter((item) => item.id.toString() !== id);
//   favorites = filteredList;
//   saveToStorage(articleKey, favorites);
// }

/******************************************************************************/

// const tokenKey = "token";
// const userKey = "user";

// import { tokenKey, userKey } from "../constants/key.js";
//**saves the (json.jwt) as token to local storage
export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

//**save (json.user) as user to local storage
export function saveUser(user) {
  saveToStorage(userKey, user);
}

//**
export function getToken() {
  return getFromStorage(tokenKey);
}

//**gets the username from the user object
//**use in createNavBar
export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }
  return null;
}

//**save username+password to local storage:
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//**get username+password to local storage:
function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }
  return JSON.parse(value);
}

/************************Add, save and get favorites*********************************/
//*save favourites product to local storage
export function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

//*clear favourites product from local storage
export function clearStorage(key) {
  localStorage.removeItem(key);
}

//*get favorites form local storage
export function getExistingFavs() {
  const favs = localStorage.getItem("favourites");
  //if favorites dosen't exist return an empty array
  if (favs === null) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}
