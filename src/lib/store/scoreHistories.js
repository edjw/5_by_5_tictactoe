import { writable, derived } from 'svelte/store';
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store";
import { games } from './pages';

const initialScoresObject = games.reduce((acc, game) => {
    acc[game.title] = { "X": [], "O": [] };
    return acc;
}, {});

export const allFinalScores = persist(writable(initialScoresObject), createIndexedDBStorage(), "allFinalScores");

/**
 * Resets the allFinalScores store to its initial state.
 */
export function resetAllFinalScores() {
    allFinalScores.delete()
    allFinalScores.set(initialScoresObject);

}


export function saveFinalScores(title, scores) {
    // Parameter validation
    if (!title || typeof title !== 'string') {
        console.error("Invalid title provided.");
        return;
    }

    if (!scores || typeof scores.X !== 'number' || typeof scores.O !== 'number') {
        console.error("Scores must be an object with numbers for 'X' and 'O'.");
        return;
    }

    allFinalScores.update(allScores => {
        // Deep clone the current scores to ensure reactivity
        const newScores = JSON.parse(JSON.stringify(allScores));

        // Check if the game exists and its scores are in the expected format
        if (newScores[title] && Array.isArray(newScores[title].X) && Array.isArray(newScores[title].O)) {
            newScores[title].X = [...newScores[title].X, scores.X];
            newScores[title].O = [...newScores[title].O, scores.O];
        } else {
            // If not, initialize arrays and set the scores for that game
            newScores[title] = {
                "X": [scores.X],
                "O": [scores.O]
            };
        }

        return newScores;
    });
}



// Derived store for statistics
export const gameStats = derived(allFinalScores, $allFinalScores => {

    /**
 * @typedef {Object} AverageScoreDifference
 * @property {("X"|"O")} leader - Indicates which player has a higher average score.
 * @property {number} difference - The average difference in scores.
 */

    /**
     * @typedef {Object} GameStatistics
     * @property {number} xWinPercentage - Percentage of games won by player X.
     * @property {number} oWinPercentage - Percentage of games won by player O.
     * @property {number} drawPercentage - Percentage of games that ended in a draw.
     * @property {AverageScoreDifference} averageScoreDifference - Average score difference details.
     */

    /**
     * An object that maps game titles to their respective statistics.
     * @type {Object.<string, GameStatistics>}
     */
    let stats = {};

    // Iterate over each game type
    for (let gameTitle in $allFinalScores) {
        let game = $allFinalScores[gameTitle];

        let totalGames = game.X && Array.isArray(game.X) ? game.X.length : 0;


        // If no games have been played, skip the calculations and continue to the next game
        if (totalGames === 0) {
            continue;
        }

        // Calculate wins and draws
        let xWins = game.X.filter((xScore, index) => xScore > game.O[index]).length;
        let oWins = game.O.filter((oScore, index) => oScore > game.X[index]).length;

        let draws = totalGames - xWins - oWins;

        // Calculate average score difference
        let totalDifference = game.X.reduce((acc, score, index) => acc + (score - game.O[index]), 0);

        let averageDifference = totalGames > 0 ? Math.abs(totalDifference / totalGames) : 0;


        /**
          * Leader can be X or O
          * @type {"X" | "O"}
          */
        let leader = totalDifference > 0 ? "X" : "O";

        stats[gameTitle] = {
            xWinPercentage: totalGames > 0 ? (xWins / totalGames) * 100 : 0,
            oWinPercentage: totalGames > 0 ? (oWins / totalGames) * 100 : 0,
            drawPercentage: totalGames > 0 ? (draws / totalGames) * 100 : 0,
            averageScoreDifference: {
                leader: leader,
                difference: averageDifference
            }
        };
    }

    return stats;
});

// Derived store for total games played
export const totalGamesForAll = derived(allFinalScores, $allFinalScores => {
    const totalGames = {};

    if ($allFinalScores) {
        const scores = $allFinalScores;

        Object.keys(scores).forEach((gameTitle) => {
            if (scores[gameTitle] && Array.isArray(scores[gameTitle].X)) {
                totalGames[gameTitle] = scores[gameTitle].X.length;
            } else {
                totalGames[gameTitle] = 0; // Default to 0 if data is missing or incorrect
            }
        });
    }

    return totalGames;
});