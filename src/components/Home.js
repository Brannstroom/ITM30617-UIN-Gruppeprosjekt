import React, { useState, useEffect } from "react";
import { isUserLoggedIn } from "../utils/login";
import classNames from "classnames";
import { PurchaseConfirmation } from "./PurchaseConfirmation";
import { Star } from "../icons/Star";
import { getOwnedGames } from "../api/game";
import { purchaseGame } from "../api/purchase";

import {
	getStoreGames,
	getFavoriteGames,
	getOwnedGamesByUser,
	fetchFavorites
} from "../api/game";

export default function Home() {
	const [games, setGames] = useState([]);
	const [favoriteGames, setFavoriteGames] = useState([]);
	const [ownedGames, setOwnedGames] = useState([]);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);
	const [favorites, setFavorites] = useState([]);
	

	useEffect(() => {
		if (!isUserLoggedIn()) {
			window.location.href = "/login";
			return;
		}
		fetchFavorites().then((data) => {
			setFavorites(data[0]?.favorites);
		});
		getStoreGames().then((games) => {
			setGames(games);
		});
		getFavoriteGames().then((favoriteGames) => {
			setFavoriteGames(favoriteGames);
		});
		getOwnedGamesByUser().then((ownedGames) => {
			setOwnedGames(ownedGames);
		});
	}, [selectedGame]);

	const handleClosePurchaseConfirmation = () => {
		setShowConfirmation(false);
	};

	const handlePurchase = (game) => {
		setSelectedGame(game);
		setShowConfirmation(true);
		purchaseGame(game).then(() => {
			getOwnedGames().then((data) => {
				setOwnedGames(data);
			});
		});
	};

	const isOwned = (game) => {
		return ownedGames.some((ownedGame) => ownedGame.id === game.id);
	};

	return (
		<>
			<div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<section className="md:col-span-2 row-start-1">
					<div className="font-semibold text-lg">
						Store
						<a
							href="/games"
							className="bg-gray-800 text-white rounded ml-3 p-1"
						>
							Visit Store
						</a>
					</div>

					<div className="mt-5 justify-center items-center">
						<div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3  gap-4 m-auto">
							{games
								.sort((a, b) => new Date(b.released) - new Date(a.released))
								.slice(0, 3)
								.map((game) => (
									<article
										key={game.id}
										className={classNames({
											"shadow-lg hover:shadow-2xl rounded-xl flex flex-col": true,
										})}
									>
										<a href={`/game/${game.slug}`}>
											<img
												src={game.background_image}
												alt={game.name}
												className="rounded-t-xl w-full h-64 object-cover"
											/>
											<div className="font-semibold text-lg ml-2">
												{game.name}
											</div>
										</a>

										<div className="ml-2 flex-grow">
											<span className="mr-2">
												{game.genres.map((genre) => (
													<span
														key={genre.id}
														className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2"
													>
														{genre.name}
													</span>
												))}
											</span>
											<div>{game.released}</div>
											<Star
												color={"black"}
												api={game.id}
												favoritesIds={favorites}
											/>
											<div className="text-gray-500 mt-4">
												{game.description_raw}
											</div>
											<div className="py-2 px-4 flex justify-end text-gray-100">
												<span className="bg-gray-800 rounded-l-md p-1 break-keep">
													{(game.id / 10).toFixed(2)} NOK
												</span>
												<button
													className={
														isOwned(game)
															? "bg-gray-400 rounded-r-md p-1"
															: "bg-sky-500 rounded-r-md p-1"
													}
													onClick={() => {
														handlePurchase(game);
													}}
													disabled={isOwned(game)}
												>
													{isOwned(game) ? "Owned" : "Purchase"}
												</button>
											</div>

											{showConfirmation && (
												<PurchaseConfirmation
													title={selectedGame.title}
													onClose={handleClosePurchaseConfirmation}
												/>
											)}
										</div>
									</article>
								))}
						</div>
					</div>
				</section>

				<section className="md:col-span-2 border-t-4 row-start-2">
					<div className="font-semibold text-lg flex items-center mt-5">
						<span className="mr-3">Game Library ({ownedGames.length})</span>
						<a href="/library" className="bg-gray-800 text-white rounded p-1">
							Visit Library
						</a>
					</div>
					<div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-5">
						{ownedGames
							.sort((a, b) => b.playtime - a.playtime)
							.slice(0, 4)
							.map((game) => (
								<article
									key={game.id}
									className="shadow-lg hover:shadow-2xl rounded-xl"
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
								</article>
							))}
					</div>
				</section>

				<aside className="md:col-span-1 md:row-start-3 lg:row-start-1 row-span-2 border-l-4">
					<div className="font-semibold text-lg ml-5">
						Favorites ({favoriteGames.length})
						<a
							href="/favorites"
							className="bg-gray-800 text-white rounded ml-3 p-1"
						>
							Visit Favorites
						</a>
					</div>
					<div className="mt-5 ml-5">
						{favoriteGames
							.sort((a, b) => b.playtime - a.playtime)
							.slice(0, 2)
							.map((game) => (
								<article
									key={game.id}
									className="shadow-lg hover:shadow-2xl rounded-xl mb-5"
								>
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
											<div>
												{isOwned(game)
													? "Hours Played: " + game.playtime
													: null}
											</div>
										</div>
									</a>
								</article>
							))}
					</div>
				</aside>
			</div>
		</>
	);
}
