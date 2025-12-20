import { createGameCard } from "./create-game-card.js";

const liveGamesContainer = document.getElementById('live-games');
const scheduledGamesContainer = document.getElementById('scheduled-games');
const finishedGamesContainer = document.getElementById('finished-games');
const noLiveGames = document.getElementById('no-live-games');
const noScheduledGames = document.getElementById('no-scheduled-games');
const noFinishedGames = document.getElementById('no-finished-games');

export function updateGames(games) {
    console.log('Received games:', games);

    const liveGames = [];
    const scheduledGames = [];
    const finishedGames = [];

    // games categorization
    games.forEach(game => {
        if (game.status.long === 'Live' || game.status.long === 'In Play') {
            liveGames.push(game);
        } else if (game.status.long === 'Scheduled') {
            scheduledGames.push(game);
        } else if (game.status.long === 'Finished') {
            finishedGames.push(game);
        }
    });

    // updating live games
    if (liveGames.length > 0) {
        liveGamesContainer.innerHTML = liveGames.map(game => createGameCard(game)).join('');
        liveGamesContainer.classList.remove('hidden');
        noLiveGames.classList.add('hidden');
    } else {
        liveGamesContainer.classList.add('hidden');
        noLiveGames.classList.remove('hidden');
    }

    // updating scheduled games
    if (scheduledGames.length > 0) {
        scheduledGamesContainer.innerHTML = scheduledGames.map(game => createGameCard(game)).join('');
        scheduledGamesContainer.classList.remove('hidden');
        noScheduledGames.classList.add('hidden');
    } else {
        scheduledGamesContainer.classList.add('hidden');
        noScheduledGames.classList.remove('hidden');
    }

    // updating finished games
    if (finishedGames.length > 0) {
        finishedGamesContainer.innerHTML = finishedGames.map(game => createGameCard(game)).join('');
        finishedGamesContainer.classList.remove('hidden');
        noFinishedGames.classList.add('hidden');
    } else {
        finishedGamesContainer.classList.add('hidden');
        noFinishedGames.classList.remove('hidden');
    }
}
