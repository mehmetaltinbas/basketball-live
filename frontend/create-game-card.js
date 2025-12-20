import { formatTime } from "./format-time.js";

export function createGameCard(game) {
    const isLive = game.status.long === 'Live';
    const isScheduled = game.status.long === 'Scheduled';
    const visitors = game.teams.visitors;
    const home = game.teams.home;
    const visitorsScore = game.scores.visitors.points;
    const homeScore = game.scores.home.points;
    const visitorsLineScore = game.scores.visitors.linescore || [];
    const homeLineScore = game.scores.home.linescore || [];

    return `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${isLive ? 'border-2 border-red-500' : ''}">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    ${isLive ? '<span class="animate-pulse h-2 w-2 bg-red-500 rounded-full"></span>' : ''}
                    <span class="text-sm font-semibold ${isLive ? 'text-red-500' : 'text-gray-500'}">
                        ${game.status.long}${isLive && game.status.clock ? ` - ${game.status.clock}` : ''}
                    </span>
                </div>
                <span class="text-sm text-gray-500">${formatTime(game.date.start)}</span>
            </div>

            <!-- Teams and Scores -->
            <div class="space-y-4">
                <!-- Visitors Team -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 flex-1">
                        <img src="${visitors.logo}" alt="${visitors.name}" class="w-10 h-10 object-contain" />
                        <div>
                            <p class="font-semibold text-gray-800">${visitors.name}</p>
                            <p class="text-xs text-gray-500">${visitors.code}</p>
                        </div>
                    </div>
                    ${!isScheduled ? `
                        <div class="flex items-center gap-4">
                            <!-- Quarter Scores -->
                            <div class="hidden sm:flex gap-2">
                                ${visitorsLineScore.map(score => `
                                    <span class="text-xs text-gray-600 w-6 text-center">${score}</span>
                                `).join('')}
                            </div>
                            <!-- Total Score -->
                            <span class="text-3xl font-bold text-gray-800 w-12 text-right">${visitorsScore}</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Home Team -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 flex-1">
                        <img src="${home.logo}" alt="${home.name}" class="w-10 h-10 object-contain" />
                        <div>
                            <p class="font-semibold text-gray-800">${home.name}</p>
                            <p class="text-xs text-gray-500">${home.code}</p>
                        </div>
                    </div>
                    ${!isScheduled ? `
                        <div class="flex items-center gap-4">
                            <!-- Quarter Scores -->
                            <div class="hidden sm:flex gap-2">
                                ${homeLineScore.map(score => `
                                    <span class="text-xs text-gray-600 w-6 text-center">${score}</span>
                                `).join('')}
                            </div>
                            <!-- Total Score -->
                            <span class="text-3xl font-bold text-gray-800 w-12 text-right">${homeScore}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Arena Info -->
            <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-500">
                    ${game.arena.name}, ${game.arena.city}, ${game.arena.state}
                </p>
            </div>
        </div>
    `;
}