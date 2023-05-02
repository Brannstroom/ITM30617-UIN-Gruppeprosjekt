import sanityClient from "../client.js";

const API_KEY = "ccc74baf87a34789932afedbe4618fd8"
const BASE_URL = "https://api.rawg.io/api/games"

export const getGames = async () => {
    const query = `*[_type == "game"] {
      "ref": _id
      title,
      slug,
      apiId
    }`;
    const data = await sanityClient.fetch(query);
    return data;

}

export const getStoreGames = async () => {
  console.log("getStoreGames 1")
  const gameIds = await getGames()
  console.log("getStoreGames 2")

  const gameIdsString = gameIds.join(",");
  const url = `${BASE_URL}?key=${API_KEY}&ids=${gameIdsString}`
  console.log(url);
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData.results;
}