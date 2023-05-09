import sanityClient from "../client.js";

const API_KEY = "ccc74baf87a34789932afedbe4618fd8"
const BASE_URL = "https://api.rawg.io/api/games"

export const getGames = async () => {
    const query = `*[_type == "game"] {
      "ref": _id,
      title,
      slug,
      apiId,
    }`;

    const data = await sanityClient.fetch(query);
    return data;
}

export const getStoreGames = async () => {
  const games = await getGames();
  const gameIds = games.map((game) => game.apiId);

  const gameIdsString = gameIds.join(",");
  const url = `${BASE_URL}?key=${API_KEY}&ids=${gameIdsString}`

  const response = await fetch(url);
  const data = await response.json();

  for(let i = 0; i < data.results.length; i++) {
    data.results[i].ref = games[i].ref;
  }

  return data.results;
}

export const getOwnedGames = async (user) => {
  const query = `*[_type == "myGame" && user._ref == "${user.ref}"]{
    "ref": _id,
    game->{
      "ref": _id,
      title,
      slug,
      apiId
    },
    isFavorite,
    hoursPlayed
  }`;

  const data = await sanityClient.fetch(query);
  return data;
}

export const getGame = async (slug) => {
  const query = `*[_type == "game" && slug.current == "${slug}"]{
    "ref": _id,
    title,
    slug,
    apiId,
  }`;
  const data = await sanityClient.fetch(query);

  const url = `${BASE_URL}/${data[0].apiId}?key=${API_KEY}`;
  const response = await fetch(url);
  const gameData = await response.json();

  return gameData;
}

export const favoriteGame = (apiId, user) => {
      fetchFavorites(user).then((data) => {
          if(data.length === 0 || data[0]?.favorites === undefined || data[0]?.favorites === null) {
            sanityClient.patch(user.ref).set({favorites: [apiId]}).commit().then(() => {
                localStorage.setItem("favorites", JSON.stringify([apiId]));
                window.location.reload();
            });
          }
          else if(data[0]?.favorites?.includes(apiId)) {
            return;
          } else {
              sanityClient.patch(user.ref).append("favorites", [apiId]).commit().then((data) => {
                    localStorage.setItem("favorites", JSON.stringify(data.favorites));
                    window.location.reload();
              });
          }
      });
}
export const unfavoriteGame = (apiId, user) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")).filter((favorite) => favorite !== apiId);
        sanityClient.patch(user.ref).set({favorites}).commit().then((data) => {
            localStorage.setItem("favorites", JSON.stringify(data.favorites));
            window.location.reload();
        })
}
export const fetchFavorites = (user) => {
    return sanityClient.fetch(`*[_type == "user" && _id == "${user.ref}"]{
        favorites[]
      }`)
}
