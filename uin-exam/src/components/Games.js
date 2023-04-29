import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGames, handleCreate } from "../api/game";
import { getCategories } from "../api/category";
export default function Games() {
  const { category } = useParams();
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePurchase = (game) => {
    setShowConfirmation(true);
    handleCreate(game, JSON.parse(localStorage.getItem("user")))
  };

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(console.error);

    getGames(category)
      .then((data) => setGames(data))
      .catch(console.error);
  }, [category]);

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
        {categories.map((category) => (
          <a
            href={`/games/${category.slug.current}`}
            key={category.title}
            className="mr-2 text-gray-600 hover:underline"
          >
            {category.title}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {games.map(
          (game) =>
            (
              <div
                key={game.id}
                className="shadow-lg hover:shadow-2xl rounded-xl flex flex-col"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="rounded-t-xl"
                />

                <div className="px-4 py-2 flex-grow">
                  <div className="font-semibold text-lg">{game.title}</div>
                  <div className="">
                    {game.categories.map((category) => (
                      <span key={category.title} className="mr-2">
                        {category.title}
                      </span>
                    ))}
                  </div>
                  <div>{game.releaseDate}</div>
                  <div className="text-gray-500 mt-4">{game.summary}</div>
                  <a
                    href={`/game/${game.slug.current}`}
                    className="hover:underline mt-2"
                  >
                    Learn more
                  </a>
                </div>

                <div className="py-2 px-4 flex justify-end text-gray-100">
                  <span className="bg-gray-800 rounded-l-md p-1 break-keep">
                    {game.price} NOK
                  </span>
                  <button
                    className="bg-sky-900 rounded-r-md p-1"
                    onClick={() => handlePurchase(game)}
                  >
                    {game.price ? `Purchase` : `Free`}
                  </button>
                </div>

                {showConfirmation && game.title && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <div className="bg-gray-100 shadow-md rounded-lg p-4">
                      <div className="text-2xl font-semibold">
                        Thank you for your purchase!
                      </div>
                      <div>
                        You successfully purchased a game and it has been added
                        to your library.
                      </div>
                      <div className="mt-4 flex justify-end items-center">
                        <a href="/library" className="hover:underline">
                          Go to library
                        </a>

                        <button
                          className="ml-4 bg-sky-900 hover:bg-sky-700 text-gray-100 px-2 py-1 rounded-md"
                          onClick={() => setShowConfirmation(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
