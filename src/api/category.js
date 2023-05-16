import { getStoreGames } from "./game"

export const getCategories = async () => {
    let categories = [];
    getStoreGames()
        .then((games) => {
            games.forEach((game) => {
                game.genres.forEach((genre) => {
                    if (!categories.includes(genre.name)) {
                        categories.push(genre.name);
                    }
                });
            });
        }
    );

    return categories;
}