import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGame } from "../api/game";

export default function Game() {
  const [game, setGame] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    getGame(slug)
      .then((game) => {
        setGame(game);
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
    </div>

  );
}
