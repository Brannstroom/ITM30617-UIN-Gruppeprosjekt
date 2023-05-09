import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {TagCloud} from "react-tagcloud";
import { getGame } from "../api/game";

export default function Game() {
  const [game, setGame] = useState({});
  const [tags, setTags] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    getGame(slug)
      .then((game) => {
        setGame(game);
        setTags(game.tags.map((tag) => {
          return {value: tag?.name, count: tag?.games_count}
        }));
      })
        .catch((error) => {
        console.log(error);
        });
  }, [slug]);

  return (


    <div>
        <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w8xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex-shrink-0">
                        <img src={game.background_image} alt={game.name} className="w-72 h-96 object-cover rounded-lg lg:rounded-none lg:w-96 lg:h-full" />
                    </div>
                    <div className="flex flex-col justify-between p-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
                            <p className="text-lg mb-4">{game.summary}</p>
                            <div className="mb-4">
                                <p className="text-lg mb-2">Rating: {game.rating}</p>
                                <p className="text-lg mb-2">Release date: {game.released}</p>
                                <p className="text-lg mb-2">Genres: {game.genres?.map((genre) => genre.name).join(", ")}</p>
                                <div className="border-b-2 border-gray-300 mb-2">
                                    <h2 className="text-lg font-bold">Plot</h2>
                                </div>
                                <p className="text-lg mb-4">{game.description_raw}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <div className="border-b-2 border-gray-300 mb-2">
                                    <h2 className="text-lg font-bold">Developers</h2>
                                </div>
                                <p className="text-lg mb-2">{game.developers?.map((dev) => dev.name).join(", ")}</p>
                                <div className="border-b-2 border-gray-300 mb-2">
                                    <h2 className="text-lg font-bold">Publishers</h2>
                                </div>
                                <p className="text-lg mb-2">{game.publishers?.map((publisher) => publisher.name).join(", ")}</p>
                            </div>
                            <div>
                                <div className="border-b-2 border-gray-300 mb-2">
                                    <h2 className="text-lg font-bold">Stores</h2>
                                </div>
                                <p className="text-lg mb-2">{game.stores?.map((store) => store.store.name).join(", ")}</p>
                            </div>
                            <div>
                                <div className="border-b-2 border-gray-300 mb-2">
                                    <h2 className="text-lg font-bold">Tags</h2>
                                </div>
                                <TagCloud minSize={12} maxSize={35} tags={tags} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    </div>

  );
}
