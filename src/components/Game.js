import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {TagCloud} from "react-tagcloud";
import { getGame } from "../api/game";

export default function Game() {
  const [game, setGame] = useState({});
  const [tags, setTags] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    getGame(slug)
      .then((game) => {
        setGame(game);
      })
        .then(() => {
          const tags = game.tags.map((tag) => {
            return {value: tag?.name, count: tag?.games_count}
          });
          setTags(tags);
        })
        .catch((error) => {
        console.log(error);
        });
  }, [slug]);

  return (
    
    <div>
      <div className="w-1/2">
        <img src={game.background_image} alt={game.name} />
      </div>
      <div className="text-2xl">
        <h1>{game.name}</h1>
        </div>
        <div className="text-2xl">
        <h2>{game.released}</h2>
        </div>
        <div className="text-2xl">
        <h3>{game.genres?.map((genre) => genre.name).join(", ")}</h3>
        </div>
        <div className="text-2xl">
        <h4>Rating: {game.rating}</h4>
        </div>
        <TagCloud minSize={12} maxSize={35} tags={tags} />


    </div>

  );
}
