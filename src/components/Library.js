import React, { useEffect, useState } from "react";
import { getOwnedGames } from "../api/game";
import { isUserLoggedIn } from "../utils/login";

export default function Library() {
    const [games, setGames] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))[0];

    useEffect(() => {
        if (!isUserLoggedIn()) {
            window.location.href = "/login";
            return;
        }
        getOwnedGames(user).then((data) => {
            setGames(data);
            console.log(data)
        });
    }, []);
    
    
    return (

        <div>
            <p>You have</p>
            <h1>{games.length}</h1>
            <p>games in your library</p>

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