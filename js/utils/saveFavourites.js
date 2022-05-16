export default function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
  }