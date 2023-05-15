import React, { useState, useEffect } from "react";
import {getFavoriteGames, getOwnedGamesByUser} from "../api/game";
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
	}

	return (
		<>
			<div className="basis-1/3 mt-10">
				<div className="font-semibold text-lg mb-5">
					Favorites ({favorites.length})
				</div>
				<div>
					{favorites
						.sort((a, b) => b.playtime - a.playtime)
						.map((game) => (
							<div key={game.id} className="mb-5">
								<a href={`/game/${game.slug}`} className="flex">
									<img
										src={game.background_image}
										alt={game.name}
										className="w-1/2 h-64 object-cover rounded-l-xl"
									/>
									<div className="p-4 w-1/2 flex flex-col justify-center items-start rounded-r-xl">
										<div className="font-semibold text-lg mb-2">
											{game.name}
										</div>
										<div>{isOwned(game) ? "Hours Played: " + game.playtime : null}</div>
									</div>
								</a>
							</div>
						))}
				</div>
			</div>
		</>
	);
}
