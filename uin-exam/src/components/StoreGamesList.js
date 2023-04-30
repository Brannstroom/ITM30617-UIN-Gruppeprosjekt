import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PurchaseConfirmation } from "./PurchaseConfirmation";
import { getUserGames } from "../api/game";
import { handleCreate } from "../api/purchase";
import { isUserLoggedIn } from "../utils/login";

export default function StoreGamesList({ games }) {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);
	const [alreadyOwned, setAlreadyOwned] = useState([]);

	useEffect(() => {
		if (isUserLoggedIn() && !alreadyOwned.length) {
			getUserGames(JSON.parse(localStorage.getItem("user")))
				.then((data) => {
					setAlreadyOwned(data);
				})
				.catch(console.error);
		}
	}, [alreadyOwned]);

	const handlePurchase = (game) => {
		if (!isOwned(game.slug.current)) {
			setSelectedGame(game);
			setShowConfirmation(true);
			handleCreate(game, JSON.parse(localStorage.getItem("user")));
		}
	};

	const handleClosePurchaseConfirmation = () => {
		setShowConfirmation(false);
	};

	const isOwned = (slug) => {
		return alreadyOwned.some((game) => game.game.slug.current === slug);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
			{games.map((game) => (
				<div
					key={game.ref}
					className={classNames({
						"shadow-lg hover:shadow-2xl rounded-xl flex flex-col": true,
						"opacity-80": isOwned(game.slug.current),
					})}
				>
					<img src={game.image} alt={game.title} className="rounded-t-xl" />

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
							disabled={isOwned(game.slug.current)}
						>
							{isOwned(game.slug.current)
								? "Owned"
								: game.price === 0
								? "Free"
								: "Purchase"}
						</button>
					</div>

					{showConfirmation && (
						<PurchaseConfirmation
							title={selectedGame.title}
							onClose={handleClosePurchaseConfirmation}
						/>
					)}
				</div>
			))}
		</div>
	);
}
