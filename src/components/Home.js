import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import { getGames } from "../api/game";

export default function Home() {
  const [games, setGames] = useState([]);
  const [wordCloudData, setWordCloudData] = useState([]);

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  useEffect(() => {
    if (wordCloudData.length == 0) {
      getGames(null).then((data) => setGames(data));
      const categories = new Map();
      games.forEach((game) => {
        game.categories.forEach((category) => {
          if (categories.has(category.title)) {
            categories.set(category.title, categories.get(category.title) + 1);
          } else {
            categories.set(category.title, 1);
          }
        });
      });

      const data = [];
      categories.forEach((value, key) => {
        data.push({ text: key, value: value });
      });

      setWordCloudData(data);
    }
  }, [games, wordCloudData.length]);

  return (
    <div className="text-xl">
      <h1>Home</h1>
      {wordCloudData.length > 0 && <h2>Word Cloud</h2>}
      <ReactWordcloud words={wordCloudData} options={options}/>
    </div>
  );
}
