import sanityClient from "../client.js";

export const purchaseGame = async (game, user) => {
  const ownedGames = await sanityClient.fetch(`*[_type == "myGame" && game._ref == "${game.id}" && user._ref == "${user[0].ref}"]`);
  if (ownedGames.length > 0) {
    return { error: "Game is already owned by the user" };
  }

  const newMyGame = {
    _type: "myGame",
    game: { _type: "reference", _ref: game.ref },
    user: { _type: "reference", _ref: user[0].ref },
    hoursPlayed: 0,
  };

  const result = await sanityClient.create(newMyGame);
  return result;
}