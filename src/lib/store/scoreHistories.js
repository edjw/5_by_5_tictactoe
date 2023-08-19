import { writable, derived } from 'svelte/store';
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store";
import { games } from './pages';

/**
 * @typedef {Object} GameScore
 * @property {number[]} X - An array of final scores for player X.
 * @property {number[]} O - An array of final scores for player O.
 */

/**
 * An object that maps game titles to their respective scores.
 * @type {Object<string, GameScore>}
 */
let scoresObject = {};

games.forEach(game => {
    scoresObject[game.title] = {
        "X": [],
        "O": []
    };
});


/**
 * A persistent Svelte store that holds the scores for all games.
 * @type {import('@macfja/svelte-persistent-store').PersistentStore<{ [x: string]: GameScore; }[]>}
 */
export const allFinalScores = persist(writable([scoresObject]), createIndexedDBStorage(), "allFinalScores");

/**
 * Updates or adds the final scores for a specific game.
 *
 * @param {string} title - The title of the game.
 * @param {GameScore} scores - The scores to save for the game.
 */
export function saveFinalScores(title, scores) {
    allFinalScores.update(allScores => {
        // Find the game by its title
        let gameScores = allScores[0][title];
        if (gameScores) {
            // Append the new scores to the existing arrays
            gameScores.X.push(...scores.X);
            gameScores.O.push(...scores.O);
        } else {
            // If the game doesn't exist, add it with the given scores
            allScores[0][title] = {
                "X": scores.X,
                "O": scores.O
            };
        }
        return allScores;
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
    for (let gameTitle in $allFinalScores[0]) {
        let game = $allFinalScores[0][gameTitle];


        let totalGames = game.X && Array.isArray(game.X) ? game.X.length : 0;


        // If no games have been played, skip the calculations and continue to the next game
        if (totalGames === 0) {
            continue;
        }

        // Calculate wins and draws
        let xWins = game.X.filter((score, index) => score > game.O[index]).length;

        let oWins = game.O.filter((score, index) => score > game.X[index]).length;
        let draws = totalGames - xWins - oWins;

        // Calculate average score difference
        let totalDifference = game.X.reduce((acc, score, index) => acc + (score - game.O[index]), 0);
        let averageDifference = Math.abs(totalDifference / totalGames);

        /**
          * Leader can be X or O
          * @type {"X" | "O"}
          */
        let leader = totalDifference > 0 ? "X" : "O";

        stats[gameTitle] = {
            xWinPercentage: (xWins / totalGames) * 100,
            oWinPercentage: (oWins / totalGames) * 100,
            drawPercentage: (draws / totalGames) * 100,
            averageScoreDifference: {
                leader: leader,
                difference: averageDifference
            }
        };
    }

    return stats;
});
