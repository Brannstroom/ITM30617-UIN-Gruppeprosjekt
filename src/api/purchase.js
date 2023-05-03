import sanityClient from "../client.js";

export const handleCreate = async (game, user, isFavorite=true, hoursPlayed=0) => {
    try {
      const createdGame = await sanityClient.create({
        _type: "myGame",
        id: Math.round(Math.random(1) * 1000000), 
        game: {
          _type: "reference",
          id: game.id,
        },
        user: {
          _type: "reference",
          _ref: user.ref,
        },
        isFavorite: false,
        hoursPlayed: 0,
      });
      console.log("Created game:", createdGame);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };