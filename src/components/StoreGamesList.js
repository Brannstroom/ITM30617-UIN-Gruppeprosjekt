import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PurchaseConfirmation } from "./PurchaseConfirmation";
import { getOwnedGames } from "../api/game";
import { handleCreate } from "../api/purchase";
import { isUserLoggedIn } from "../utils/login";

export default function StoreGamesList({ games }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [alreadyOwned, setAlreadyOwned] = useState([]);

  useEffect(() => {
    if (isUserLoggedIn()) {
      getOwnedGames(JSON.parse(localStorage.getItem("user")))
        .then((data) => {
          setAlreadyOwned(data);
        })
        .catch(console.error);
    }
  }, []);

  const handlePurchase = (game) => {
    if (!isOwned(game.slug.current)) {
      setSelectedGame(game);
      setShowConfirmation(true);
      handleCreate(game, JSON.parse(localStorage.getItem("user")));
    }
  };

  const handleClosePurchaseConfirmation = () => {
    setShowConfirmation(false);
  };

  const isOwned = (slug) => {
    return alreadyOwned.some((game) => game.game.slug.current === slug);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
      {games.map((game) => (
        <div
          key={game.id}
          className={classNames({
            "shadow-lg hover:shadow-2xl rounded-xl flex flex-col": true,
            "opacity-80": isOwned(game.slug.current),
          })}
        >
          <img
            src={game.background_image}
            alt={game.name}
            className="rounded-t-xl"
          />

          <div className="px-4 py-2 flex-grow">
            <div className="font-semibold text-lg">{game.name}</div>
            <div>
              {game.genres.map((genre) => (
                <span key={genre.name} className="mr-2">
                  {genre.name}
                </span>
                ))}
            </div>
            <div>
              {game.released}
            </div>
            <div className="text-gray-500 mt-4">
              {game.description_raw}
            </div>
          </div>

          {showConfirmation && (
            <PurchaseConfirmation
              title={selectedGame.title}
              onClose={handleClosePurchaseConfirmation}
            />
          )}
        </div>
      ))}
    </div>
  );
}
