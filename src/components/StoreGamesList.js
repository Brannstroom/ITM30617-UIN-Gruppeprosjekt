import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PurchaseConfirmation } from "./PurchaseConfirmation";

export default function StoreGamesList({ games }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [alreadyOwned, setAlreadyOwned] = useState([]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
      {games.map((game) => (
        <div
          key={game.ref}
          className={classNames({
            "shadow-lg hover:shadow-2xl rounded-xl flex flex-col": true,
          })}
        >
          <h1>{game.title}</h1>

          {showConfirmation && (
            <PurchaseConfirmation
              title={selectedGame.title}
            />
          )}
        </div>
      ))}
    </div>
  );
}