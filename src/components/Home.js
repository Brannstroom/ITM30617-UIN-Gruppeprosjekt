import React, {useState, useEffect} from "react";
import StoreGamesList from "./StoreGamesList";
import { getStoreGames } from "../api/game";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect (() => {
    getStoreGames()
      .then((games) => {
        setGames(games.slice(0, 3));
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);
  return (
		<>
			<div className="flex flex-wrap w-4/5 m-auto">
				<div className="basis-full">
					<div className="font-semibold text-lg">Store 
            <a href="/games" className="bg-black text-white rounded ml-3 p-1"> Visit Store</a>
          </div>
            {/* Get 3 games */}
            <div className="flex justify-center items-center mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-4/5 m-auto">
                <StoreGamesList games={games} />
              </div>
            </div>
        </div>



				<div className="basis-1/3 mt-10">
					<div className="font-semibold text-lg">Game Library
          <a href="/library" className="bg-black text-white rounded ml-3 p-1"> Visit Library</a>
          </div>
            {/* Get 4 games from library */}

				</div>



				<div className="basis-2/3 mt-10">
					<div className="font-semibold text-lg">Favorites
          <a href="/favorites" className="bg-black text-white rounded ml-3 p-1"> Visit Favorites</a>
          </div>
          {/* Get 2 games from favorites */}

				</div>
      </div>
		</>
	);
}