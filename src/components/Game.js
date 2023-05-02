import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGame } from "../api/game";

export default function Game() {
  const [game, setGame] = useState({});
  const { slug } = useParams();

  return (
		<div className="text-xl text-center">
      <div className="font-semibold text-3xl mb-3">{game.title}</div>
			<img src={game.image} alt={game.title} className="rounded-t-xl mx-auto mb-5" />
			<div className="mb-5">
				{game.categories?.map((category) => (
					<span key={category.title} className="mr-2 text-blue-700 bg-cyan-300 p-1 rounded bg-opacity-50" >
						{category.title}
					</span>
				)) || "No categories found"}
			</div>
      <div className="mb-100">
        <div>Release Date: {game.releaseDate}</div>
        <div>Developers: {game.developers}</div>
        <div>Publishers: {game.publisher}</div>
        <div>Platforms: {game.platforms}</div>
        <div>Rating: {game.rating}/5</div>
        <div>Stores: {game.stores}</div>
      </div>

      <p className="text-2xl mt-10 mb-2">Summary</p>
			<div className="text-gray-800 text-left w-6/12 mx-auto">{game.summary}</div>
      <p className="text-2xl mt-10 mb-2">Description</p>
			<div className="text-gray-800 text-left w-6/12 mx-auto" >{game.description}</div>
		  {/* <pre>
				<code>{JSON.stringify(game, null, 2)}</code>
			</pre>  */}
		</div>
	);
}
