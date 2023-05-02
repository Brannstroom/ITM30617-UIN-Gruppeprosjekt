import React, { useState, useEffect } from "react";
import { TagCloud } from 'react-tagcloud'
import { getGames } from "../api/game";

export default function Home() {
  const [games, setGames] = useState([]);
  const [wordCloudData, setWordCloudData] = useState([]);

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [10, 25, 40],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  useEffect(() => {
    if (wordCloudData.length === 0) {
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
        data.push({ value: key, count: value });
      });

      setWordCloudData(data);
    }
  }, [games, wordCloudData.length]);
  return (
    <>
      <TagCloud tags={wordCloudData} options={options} minSize={10} maxSize={40}/>
      </>
  );
}
