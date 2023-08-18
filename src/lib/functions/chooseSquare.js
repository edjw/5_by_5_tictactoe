import { get } from 'svelte/store';

import { turn, gridArray, playerScores, numberOfTurnsTaken } from "$lib/store/store";

import { countAllLinesForPlayer } from "$lib/functions/calculateScores";

/**
 * Handles the logic for choosing a square.
 *
 * @param {number} targetRow - The target row of the square to update.
 * @param {number} targetCol - The target column of the square to update.
 * @param {boolean} twoGoesForOFirstTurn - Whether the O player gets to play twice on their first turn or not.
 * @param {number} twoMultiplier - Multiplier value to calculate the score for two consecutive squares.
 * @param {number} threeMultiplier - Multiplier value for three consecutive squares.
 * @param {number} fourMultiplier - Multiplier value for four consecutive squares.
 * @param {number} fiveMultiplier - Multiplier value for five consecutive squares.
 */
export function chooseSquare(targetRow, targetCol, twoGoesForOFirstTurn, twoMultiplier, threeMultiplier, fourMultiplier, fiveMultiplier) {

    const currentGridArray = get(gridArray);  // get the current value
    const currentTurn = get(turn); // get the current value
    const currentNumberOfTurnsTaken = get(numberOfTurnsTaken); // get the current value


    // Update the grid data
    gridArray.update((arr) => {
        return arr.map((square) => {
            if (square.row === targetRow && square.col === targetCol) {
                return {
                    ...square,
                    value: currentTurn
                };
            }
            return square;
        });
    });



    // Count the current scores
    const currentPlayerScore = countAllLinesForPlayer(currentGridArray, currentTurn);

    // Update playerScores based on the current player and their score
    playerScores.updatePlayerScore(
        currentPlayerScore,
        twoMultiplier,
        threeMultiplier,
        fourMultiplier,
        fiveMultiplier
    );

    // hack to allow the game with two goes for O on first turn. numberofTurnsTaken will be 1 for O's first turn, but not its second turn or any other turn
    if (twoGoesForOFirstTurn === false || currentNumberOfTurnsTaken !== 1) {
        // Switch the turn to the other player
        turn.update((value) => (value === "X" ? "O" : "X"));
    }

    numberOfTurnsTaken.update((value) => value + 1);
}