import React, { useState, useEffect } from "react";
import { getFavoriteGames, getOwnedGamesByUser } from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Favorites() {
	const [favorites, setFavorites] = useState([]);
	const [ownedGames, setOwnedGames] = useState([]);
	useEffect(() => {
		if (!isUserLoggedIn()) {
			window.location.href = "/login";
			return;
		}
		getFavoriteGames().then((favorites) => {
			setFavorites(favorites);
		});
		getOwnedGamesByUser().then((ownedGames) => {
			setOwnedGames(ownedGames);
		});
	}, []);

	const isOwned = (game) => {
		return ownedGames.some((ownedGame) => ownedGame.id === game.id);
	};

	return (
		<>
			<div className="text-center">
				<h1 className="text-3xl font-semibold tracking-wide mt-2">
					My Favorites
				</h1>
				<h2 className="text-lg text-gray-600">
					You have {favorites.length} {favorites.length > 1 ? "favorites" : "favorite"}
				</h2>
			</div>
			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
				{favorites
					.sort((a, b) => b.playtime - a.playtime)
					.map((game) => (
						<a
							key={game.id}
							href={`/game/${game.slug}`}
							className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden"
						>
							<img
								src={game.background_image}
								alt={game.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<div className="font-semibold text-lg mb-2">{game.name}</div>
								{isOwned(game) && (
									<div className="text-gray-600">
										Hours Played: {game.playtime}
									</div>
								)}
							</div>
						</a>
					))}
			</section>
		</>
	);
}
