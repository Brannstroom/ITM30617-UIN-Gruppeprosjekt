import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";


export default function Games() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "game"]{
                    id,
                    title,
                    slug,
                    image,
                    categories[]->{
                        title,
                    },
                    publishedAt,
                    rating,
                    summary,
                    developers,
                    publisher,
                    platforms,
                    stores,
                }`
            )
            .then((data) => setGames(data))
            .catch(console.error);
    }, []);


    return (
        <div>
          {games &&
            games.map((game) => (
              <div key={game?.id}>
                <h1>{game?.title}</h1>
                <img src={game?.image} alt={game?.title} />
                <h2>{game?.categories.map((category) => category?.title)}</h2>
                <h2>{game?.publishedAt}</h2>
                <h2>{game?.rating}</h2>
                <p>{game?.summary}</p>
                <h2>{game?.developers}</h2>
                <h2>{game?.publisher}</h2>
                <h2>{game?.platforms}</h2>
                <h2>{game?.stores}</h2>
              </div>
            ))}
        </div>
      );
}      