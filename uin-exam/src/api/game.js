import sanityClient from "../client.js";

export const getGames = async (category) => {
  const queryHead = category
    ? `*[_type == "game"]["${category}" in categories[]->slug.current]`
    : `*[_type == "game"]`;

  const queryTail = `{
        "ref": _id,
        id,
        title,
        slug,
        image,
        categories[]->{
          title,
          slug,
        },
        releaseDate,
        rating,
        summary,
        description,
        developers,
        publisher,
        platforms,
        stores,
        price,
      }`;

  const query = `${queryHead}${queryTail}`;
  const data = await sanityClient.fetch(query);
  return data;
};

export const getGame = async (slug) => {
  const query = `*[_type == "game" && slug.current == "${slug}"]{
      "ref": _id,
      id,
      title,
      slug,
      image,
      categories[]->{
        title,
        slug,
      },
      releaseDate,
      rating,
      summary,
      description,
      developers,
      publisher,
      platforms,
      stores,
      price,
    }`;

  const data = await sanityClient.fetch(query);
  return data[0];
};

export const handleCreate = async (game, user, isFavorite=true, hoursPlayed=0) => {
  try {
    const createdGame = await sanityClient.create({
      _type: "myGame",
      id: Math.round(Math.random(1) * 1000000), 
      game: {
        _type: "reference",
        _ref: game.ref,
      },
      user: {
        _type: "reference",
        _ref: user[0].ref,
      },
      isFavorite: false,
      hoursPlayed: 0,
    });
    console.log("Created game:", createdGame);
  } catch (error) {
    console.error("Error creating game:", error);
  }
};

export const getUserGames = async (user) => {
  const query = `*[_type == "myGame" && user._ref == "${user[0].ref}"]{
    "ref": _id,
    id,
    game->{
      title,
      slug,
      image,
      categories[]->{
        title,
        slug,
      },
      releaseDate,
      rating,
      summary,
      description,
      developers,
      publisher,
      platforms,
      stores,
      price,
    },
    user->{
      name,
      email,
      ref,
    },
    isFavorite,
    hoursPlayed,
  }`;
  const data = await sanityClient.fetch(query);
  return data;
};


