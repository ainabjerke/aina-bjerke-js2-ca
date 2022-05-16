export function getExistingFavs() {
  const favs = localStorage.getItem("favourites");
  //if favorites dosen't exist return an empty array
  if (favs === null) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}

export function clearStorage(key) {
  localStorage.removeItem(key);
}
