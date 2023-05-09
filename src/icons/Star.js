import React from 'react';
import {favoriteGame, fetchFavorites, unfavoriteGame} from "../api/game";

export const Star = ({color, api}) => {

    const user = JSON.parse(localStorage.getItem("user"))[0];
    const isFavorite = () => {
        if(!localStorage.getItem("favorites")) {
            fetchFavorites(user).then((data) => {
                if(data[0].favorites === null || data[0].favorites === undefined) {
                    return false;
                }
                localStorage.setItem("favorites", JSON.stringify(data[0].favorites));
                return JSON.parse(localStorage.getItem("favorites")).includes(api);
            });
        }
        else {
            return JSON.parse(localStorage.getItem("favorites")).includes(api);
        }
    }
    let clicked = false;
    const handleClick = () => {
        if(isFavorite() && !clicked) {
            unfavoriteGame(api, user);
        } else {
            favoriteGame(api, user);
        }
    }

    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite() ? "yellow" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color}
             onClick={() => handleClick()}
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
        </svg>
    )
}

