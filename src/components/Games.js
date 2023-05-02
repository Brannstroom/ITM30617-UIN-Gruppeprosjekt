import React, {useState, useEffect} from "react";
import StoreGamesList from "./StoreGamesList";
import { getStoreGames } from "../api/game";

export default function Games() {

  const [games, setGames] = useState([]);

  useEffect (() => {

    getStoreGames()
      .then((games) => {
        setGames(games);
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);

  return (
    <div>
    <div className="text-2xl">
      <h1>Store</h1>
    </div>

    <div className="mt-4 flex items-center">
      <span className="mr-2 font-medium text-gray-600">Categories:</span>
      <a href="/games" className="mr-2 hover:underline">
        All
      </a>

    </div>
    <StoreGamesList games={games} />
  </div>
  );
}
