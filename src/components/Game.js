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
        console.log(game)
      })
        .catch((error) => {
        console.log(error);
        });
  }, [slug]);

  return (


    <div>
      {/*Make a nice overview for a game, use tailwind for css styling **/}
        <div className="flex flex-row">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{game.name}</h1>
                <p className="text-xl">{game.summary}</p>
                <img src={game.background_image} alt={game.name} className="w-1/4"/>
                <p className="text-xl">Rating: {game.rating}</p>
                <p className="text-xl">Release date: {game.released}</p>
                <p className="text-xl">Genres: {game.genres?.map((genre) => genre.name).join(", ")}</p>
                <p className="text-xl">Plot: {game.description_raw}</p>
                <p className="text-xl">Platforms: {game.parent_platforms?.map((platform) => platform.platform.name).join(", ")}</p>
                <p className="text-xl">Developers: {game.developers?.map((dev) => dev.name).join(", ")}</p>
                <p className="text-xl">Publishers: {game.publishers?.map((publisher) => publisher.name).join(", ")}</p>
                <p className="text-xl">Stores: {game.stores?.map((store) => store.store.name).join(", ")}</p>
            </div>
        </div>




        <TagCloud minSize={15} maxSize={35} tags={tags} />


    </div>

  );
}
