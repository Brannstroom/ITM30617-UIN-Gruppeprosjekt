import sanityClient from "../client.js";
import { getUser } from "../utils/user.js";

const API_KEY = "ccc74baf87a34789932afedbe4618fd8";
const BASE_URL = "https://api.rawg.io/api/games";

export const getGames = async (category) => {
  const queryHead = category
    ? `*[_type == "game"]["${category}" in categories[]->slug.current]`
    : `*[_type == "game"]`;
  const query = `${queryHead} {
    "ref": _id,
    title,
    slug,
    apiId,
    categories[]->{
      title,
      slug
    },
  }`;

  const data = await sanityClient.fetch(query);
  return data;
};

export const getStoreGames = async (userGames = false, category) => {
  let games = [];
  if (userGames) {
    games = await getOwnedGames();
  } else {
    games = await getGames(category);
  }
  if (!games || games.length === 0) return [];

  const gameIds = userGames
    ? games.map((game) => game.game.apiId)
    : games.map((game) => game.apiId);

  const gameIdsString = gameIds.join(",");
  const url = `${BASE_URL}?key=${API_KEY}&ids=${gameIdsString}`;

  const response = await fetch(url);
  const data = await response.json();
  data.results = data.results.map((game) => {
    const ref = userGames
      ? games.find((g) => g.game.apiId === game.id).ref
      : games.find((g) => g.apiId === game.id).ref;
    return { ...game, ref };
  });
  return data.results;
};

export const getOwnedGames = async () => {
  const user = getUser();
  const query = `*[_type == "myGame" && user._ref == "${user.ref}"]{
    "ref": _id,
    game->{
      "ref": _id,
      title,
      slug,
      apiId
    },
    hoursPlayed
  }`;

  const data = await sanityClient.fetch(query);
  return data;
};

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
};

export const favoriteGame = (apiId) => {
  const user = getUser();
  fetchFavorites().then((data) => {
    if (
      data.length === 0 ||
      data[0]?.favorites === undefined ||
      data[0]?.favorites === null
    ) {
      sanityClient
        .patch(user.ref)
        .set({ favorites: [apiId] })
        .commit();
    } else if (data[0]?.favorites?.includes(apiId)) {
    } else {
      sanityClient.patch(user.ref).append("favorites", [apiId]).commit();
    }
  });
};
export const unfavoriteGame = (apiId) => {
  const user = getUser();
  fetchFavorites().then((data) => {
    const filtered = data[0]?.favorites?.filter((id) => id !== apiId);
    sanityClient.patch(user.ref).set({ favorites: filtered }).commit();
  });
};
export const fetchFavorites = () => {
  const user = getUser();
  return sanityClient.fetch(`*[_type == "user" && _id == "${user.ref}"]{
        favorites[]
      }`);
};

export const getOwnedGamesByUser = () => {
  return getStoreGames(true);
};

export const getFavoriteGames = () => {
  return fetchFavorites().then((favoriteIds) => {
    const gameIdsString = favoriteIds[0]?.favorites?.join(",");
    const url = `${BASE_URL}?key=${API_KEY}&ids=${gameIdsString}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.results = data.results.map((game) => {
          const ref = favoriteIds[0]?.favorites?.includes(game.id)
            ? favoriteIds[0].favorites.find((id) => id === game.id)
            : null;
          return { ...game, ref };
        });
        return data.results;
      });
  });
};
