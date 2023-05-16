import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreGamesList from "./StoreGamesList";
import { getCategoryGames } from "../api/game";
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
    
    getCategoryGames(category).then((games) => {
      setGames(games);
    });

    
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
        {categories.length > 0 ? (
        categories.map((category) => (
          <a
            href={`/games/${category.toLowerCase()}`}
            key={category}
            className="mr-2 hover:underline"
          >
            {category}
          </a>
        ))
      ) : (
        <span>Loading categories...</span>
      )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        <StoreGamesList games={games} />
      </div>
    </div>
  );
}
