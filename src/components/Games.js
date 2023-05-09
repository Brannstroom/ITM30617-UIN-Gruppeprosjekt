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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
      <StoreGamesList games={games} />
    </div>
  </div>
  );
}
