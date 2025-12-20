import { GameStatus } from '../constants/game-status.constant.js';
import { gamesService } from './games.service.js';

function startPollingGames(io) {
    async function poll() {
        console.log("polling...");
        const date = new Date();
        const response = await gamesService.fetchGames(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        );

        const hasLiveGames = response.response.some(
            game => game.status.long === GameStatus.LIVE || game.status.long === GameStatus.IN_PLAY, 
        );

        const delay = hasLiveGames ? 1 * 60 * 1000 : 20 * 60 * 1000;
        
        io.emit('games', response);
        
        setTimeout(poll, delay); // Recursive call with dynamic delay
    }

    poll(); // Start immediately
}

export const websocketService = {
    startPollingGames
}
