import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGame } from "../api/game";

export default function Game() {
  const [game, setGame] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    console.log("Slug", slug);
    getGame(slug)
      .then((data) => {
        setGame(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <div className="text-xl">
      <h1>Game</h1>

      <pre>
        <code>{JSON.stringify(game, null, 2)}</code>
      </pre>
    </div>
  );
}
