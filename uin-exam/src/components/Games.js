import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGames } from "../api/game";
import { getCategories } from "../api/category";
import StoreGamesList from "./StoreGamesList";

export default function Games() {
  const { category } = useParams();
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

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

          <StoreGamesList games={games} />
      </div>
  );
}
