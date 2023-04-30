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


