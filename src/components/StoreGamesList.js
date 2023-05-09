import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PurchaseConfirmation } from "./PurchaseConfirmation";
import { getOwnedGames } from "../api/game";
import { purchaseGame } from "../api/purchase";
import { isUserLoggedIn } from "../utils/login";

export default function StoreGamesList({ games }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [alreadyOwned, setAlreadyOwned] = useState([]);

  useEffect(() => {
    if (isUserLoggedIn()) {
      const user = JSON.parse(localStorage.getItem("user"))[0];
      getOwnedGames(user)
        .then((data) => {
          setAlreadyOwned(data);
          console.log(data)
        })
        .catch(console.error);
    }
  }, [selectedGame]);

  const handleClosePurchaseConfirmation = () => {
    setShowConfirmation(false);
  };
  const handlePurchase = (game) => {
    if(!isOwned(game)) {
      setSelectedGame(game);
      setShowConfirmation(true);
      purchaseGame(game, JSON.parse(localStorage.getItem("user")));
    }
  }

  const isOwned = (game) => {
    return alreadyOwned.some((g) => g.id === game.id);
  }

  return (
    <>
      {games.map((game) => (
        <div
          key={game.id}
          className={classNames({
            "shadow-lg hover:shadow-2xl rounded-xl flex flex-col": true,
          })}
        >
          <a href={`/game/${game.slug}`}>
            <img
              src={game.background_image}
              alt={game.name}
              className="rounded-t-xl w-full h-auto"
            />
            <div className="font-semibold text-lg ml-2">{game.name}</div>
          </a>

          <div className="ml-2 flex-grow">
            <div>
              {game.genres.map((genre) => (
                <span key={genre.name} className="mr-2">
                  {genre.name}
                </span>
              ))}
            </div>
            <div>{game.released}</div>
            <div className="text-gray-500 mt-4">{game.description_raw}</div>
            <div className="py-2 px-4 flex justify-end text-gray-100">
              <span className="bg-gray-800 rounded-l-md p-1 break-keep">
                {(game.id / 10).toFixed(2)} NOK
              </span>
              <button
                className="bg-sky-900 rounded-r-md p-1"
                onClick={() => {handlePurchase(game)}}
                disabled={true}
              >
                {"Purchase"}
              </button>
              <img className="ml-2 object-cover h-8 w-8" src={require("../icons/heart_unfilled.png")}/>
            </div>

            {showConfirmation && (
              <PurchaseConfirmation
                title={selectedGame.title}
                onClose={handleClosePurchaseConfirmation}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
