import sanityClient from "../client.js";

export const getGames = async (category) => {
  const queryHead = category
    ? `*[_type == "game"]["${category}" in categories[]->slug.current]`
    : `*[_type == "game"]`;

  const queryTail = `{
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
  console.log(data);
  return data[0];
};
