import { GameStatus } from '../constants/game-status.constant.js';
import { gamesService } from './games.service.js';

export function startPolling(io) {
    let delay = 20 * 60 * 1000;
    setInterval(async () => {
        const date = new Date();
        const response = await gamesService.fetchGames(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

        for (const game of response.response) {
            if (game.status.long === GameStatus.LIVE) {
                delay = 1 * 60 * 1000;
                break
            } else {
                delay = 20 * 60 * 1000;
                continue
            }
        }

        io.emit('games', response.response)
    }, delay)
}