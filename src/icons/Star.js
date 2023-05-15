import React, { useState, useEffect } from 'react';
import {favoriteGame, unfavoriteGame} from "../api/game";

export const Star = ({color, api, favoritesIds}) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(!favorites || favorites.length === 0) {
            setFavorites(favoritesIds);
        }
    }, [favorites, favoritesIds]);
    const isFavorite = () => {
        if(!favorites) {
            return false;
        }
        return favorites.includes(api);
        }

    let clicked = false;
    const handleClick = () => {
        if(isFavorite() && !clicked) {
            unfavoriteGame(api);
            setFavorites(favorites.filter(favorite => favorite !== api));
            clicked = true;
        } else {
            favoriteGame(api);
            if(!favorites || favorites.length === 0) {
                setFavorites([api]);
            } else {
                setFavorites([...favorites, api]);
            }
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

