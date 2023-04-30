import React, { useEffect, useState } from "react";
import { getUserGames } from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Library() {
    const [games, setGames] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!isUserLoggedIn()) {
            window.location.href = "/login";
            return;
        }
        getUserGames(user)
            .then((data) => {
                setGames(data);
            })
            .catch(console.error);
    }, [user]);
    
    
    return (

        <div>
        {games.map((game) => (
            <div key={game.ref} className="shadow-lg hover:shadow-2xl rounded-xl flex flex-col">
                <img src={game.game.image} alt={game.game.title} className="rounded-t-xl" />
                <h2>{game.game.title}</h2>
                <p>Hours played: {game.hoursPlayed}</p>
                <p>Favorited? {game.isFavorite}</p>
            </div>
        ))}
        </div>
    );
}