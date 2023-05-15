import React, { useEffect, useState } from "react";
import {getOwnedGamesByUser, getStoreGames} from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Library() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (!isUserLoggedIn()) {
            window.location.href = "/login";
            return;
        }
        getOwnedGamesByUser().then((games) => {
            setGames(games);
        });

    }, []);
    
    
    return (

        <div>
            <p>You have</p>
            <h1>{games.length}</h1>
            <p>games in your library</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                {games.map((game) => (
                    <div key={game.id} className="bg-white rounded-lg shadow-md">
                        <a href={`/game/${game.slug}`} className="block">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-64 object-cover"
                            />
                        </a>
                        <div className="p-4">
                            <a href={`/game/${game.slug}`} className="block text-black-500 hover:text-gray:600 font-semibold text-lg mb-2">
                                {game.name}
                            </a>
                        </div>
        </div>
                ))}
            </div>
        </div>
    );
}