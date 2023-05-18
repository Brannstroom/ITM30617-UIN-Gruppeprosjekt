import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreGamesList from "./StoreGamesList";
import { getStoreGames } from "../api/game";
import { isUserLoggedIn } from "../utils/login";
import { getCategories } from "../api/category";

export default function Games() {

  const { category } = useParams();
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      window.location.href = "/login";
      return;
    }

    getCategories().then((categories) => {
      setCategories(categories);
    });
    
    getStoreGames(false, category).then((games) => {
      setGames(games);
    });

    
  }, [category]);

  return (
    <div>
      <header className="text-2xl">
        <h1>Store</h1>
      </header>

      <section className="mt-4 flex items-center">
        <span className="mr-2 font-medium text-gray-600">Categories:</span>
        <a href="/games" className="mr-2 hover:underline">
          All
        </a>
        {categories.length > 0 ? (
        categories.map((category) => (
          <a
            href={`/games/${category.slug.current}`}
            key={category.slug.current}
            className="mr-2 hover:underline">
            {category.title}
          </a>
        ))
      ) : (
        <span>Loading categories...</span>
      )}
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        <StoreGamesList games={games} />
      </div>
      {games && games.length === 0 && (
          <div className="text-center w-full">
            <h2 className="text-xl text-gray-600">No games found</h2>
          </div>
        )}
    </div>
  );
}
