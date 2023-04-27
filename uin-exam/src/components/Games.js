import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";

export default function Games() {
  const { category } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "game"]{
        id,
        title,
        slug,
        image,
        categories[]->{
          title,
          slug,
        },
        publishedAt,
        rating,
        summary,
        developers,
        publisher,
        platforms,
        stores,
      }`,
    )
      .then((data) => setGames(data))
      .catch(console.error);
  }, [category]);

  return (
    <div>
      <div className="text-xl">
        <h1>Store</h1>
      </div>

      {games && games.map((game) => {

      {/* Hvis det er valgt en kategori vil denne fjerne alle spill som ikke har den spesifike kategorien. */}
      if (category && !game.categories.some((cat) => cat.slug.current === category)) return null;

        return (
          <div key={game.id}>
            <h2>{game.title}</h2>
            <img src={game.image} alt={game.title} />
            <p>{game.summary}</p>
            <p>{game.rating}</p>
            <p>{game.developers}</p>
            <p>{game.publisher}</p>
            <p>{game.platforms}</p>
            <p>{game.stores}</p>
          </div>
        )
          
      })}
              
    </div>
  );
}
