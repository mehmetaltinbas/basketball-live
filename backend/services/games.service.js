import axios from 'axios';

async function fetchGames(date) {
    const response = (await axios.get(`https://v2.nba.api-sports.io/games?date=${date}`, {
        headers: {
            "x-apisports-key": "d9b9465f5f00a3288c6aeba7862bf10d"
        }
    })).data;
    return response;
}

export const gamesService = {
    fetchGames,
}
