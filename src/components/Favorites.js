import React, { useState, useEffect } from "react";
import { getFavoriteGames } from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Favorites() {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!isUserLoggedIn()) {
			window.location.href = "/login";
			return;
		}
		getFavoriteGames().then((favorites) => {
			setFavorites(favorites);
		});
	}, []);

	return (
		<div>
			<div className="text-center">
				<h1 className="text-3xl font-semibold tracking-wide mt-2">
					My Favorites
				</h1>
				<h2 className="text-lg text-gray-600">
					You have {favorites.length} {favorites.length > 1 ? " favorite games" : "favorite game"}
				</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
				{favorites.map((game) => (
					<article key={game.id} className="bg-white rounded-lg shadow-md">
						<a href={`/game/${game.slug}`} className="block">
							<img
								src={game.background_image}
								alt={game.name}
								className="w-full h-64 object-cover"
							/>
						</a>
						<div className="p-4">
							<a
								href={`/game/${game.slug}`}
								className="block text-black-500 hover:text-gray:600 font-semibold text-lg mb-2"
							>
								{game.name}
							</a>
							<div className="text-gray-600">Time played: {game.playtime}</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
