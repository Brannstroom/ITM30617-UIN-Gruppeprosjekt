import sanityClient from "../client.js";

const API_KEY = "ccc74baf87a34789932afedbe4618fd8"
const BASE_URL = "https://api.rawg.io/api/games"

export const getGames = async () => {
    const query = `*[_type == "game"] {
      "ref": _id,
      title,
      slug,
      apiId
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
  console.log(data);
  return data.results;
}

export const getOwnedGames = async (user) => {
  const query = `*[_type == "myGame" && user._ref == "${user[0].ref}"]{
    "ref": _id,
    game->{
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