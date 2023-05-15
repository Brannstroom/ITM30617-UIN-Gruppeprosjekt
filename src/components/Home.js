import React, { useState, useEffect } from "react";
import StoreGamesList from "./StoreGamesList";
import {
	getStoreGames,
	getFavoriteGames,
	getOwnedGamesByUser,
} from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Home() {
	const [games, setGames] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [ownedGames, setOwnedGames] = useState([]);

	useEffect(() => {
		if (!isUserLoggedIn()) {
			window.location.href = "/login";
			return;
		}
		getStoreGames().then((games) => {
			setGames(games.slice(0, 3));
		});
		getFavoriteGames().then((favorites) => {
			setFavorites(favorites);
		});
		getOwnedGamesByUser().then((ownedGames) => {
			setOwnedGames(ownedGames);
		});
	}, []);
	return (
		<>
			<div className="flex flex-wrap w-4/5">
				<div className="basis-full">
					<div className="font-semibold text-lg">
						Store
						<a href="/games" className="bg-black text-white rounded ml-3 p-1">
							Visit Store
						</a>
					</div>
					{/* Get 3 games */}
					<div className="flex justify-center items-center mt-10">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-4/5 m-auto">
							<StoreGamesList games={games} />
						</div>
					</div>
				</div>

				<div className="basis-2/3 mt-10">
					<div className="font-semibold text-lg flex items-center mb-5">
						<span className="mr-3">Game Library ({ownedGames.length})</span>
						<a href="/library" className="bg-black text-white rounded p-1">
							Visit Library 
						</a>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{ownedGames
							.sort((a, b) => b.playtime - a.playtime)
							.slice(0, 4)
							.map((game) => (
								<div
									key={game.id}
									className="bg-gray-100 rounded-lg overflow-hidden flex"
								>
									<a href={`/game/${game.slug}`} className="flex w-full">
										<img
											src={game.background_image}
											alt={game.name}
											className="w-1/2 h-48 object-cover"
										/>
										<div className="p-4 w-1/2 flex flex-col justify-center items-start">
											<div className="font-semibold text-lg mb-2">
												{game.name}
											</div>
											<div>Hours Played: {game.playtime}</div>
										</div>
									</a>
								</div>
							))}
					</div>
				</div>

				<div className="basis-1/3 mt-10 border-l border-black pl-4">
					<div className="font-semibold text-lg mb-5">
						Favorites ({favorites.length})
						<a
							href="/favorites"
							className="bg-black text-white rounded ml-3 p-1"
						>
							Visit Favorites
						</a>
					</div>
					<div>
						{favorites
							.sort((a, b) => b.playtime - a.playtime)
							.slice(0, 2)
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
											<div>Hours Played: {game.playtime}</div>
										</div>
									</a>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
