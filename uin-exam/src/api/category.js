import sanityClient from "../client.js";

export const getCategories = async () => {
  const query = `*[_type == "category"]{
        title,
        slug,
    }`;
  const data = await sanityClient.fetch(query);
  return data;
};
