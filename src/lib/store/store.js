import { writable } from 'svelte/store';

// Player turn state
/**
 * @type {import('svelte/store').Writable<"X" | "O">}
 * Represents the current turn: 'X' or 'O'
 */
export const turn = writable("X");

export const numberOfTurnsTaken = writable(0);

/**
 * Represents the last turn that was undone
 * @type {import('svelte/store').Writable<"X" | "O" | null>}
 */
export const lastUndoneTurn = writable(null);

export const canUndo = writable(true);



// Player score state
/**
 * Represents the score of a player within a single game
 * @typedef {{ score: number; lines: { [key: string]: number }; }} PlayerScore
 */

/**
 * Represents the state of the score
 * @typedef {Object} ScoreState
 * @property {PlayerScore} X - Player X's score state
 * @property {PlayerScore} O - Player O's score state
 */

/**
 * Represents the history of the store's state
 * @type {ScoreState[]}
 */
let history = [];

/**
 * Represents a player type
 * @typedef {'X' | 'O'} PlayerType
 */

/**
 * Resets player scores to initial values
 */
function resetPlayerScores() {
    playerScores.set({
        "X": {
            score: 0,
            lines: {
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0
            }
        },
        "O": {
            score: 0,
            lines: {
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0
            }
        }
    });
}

function updatePlayerScore(scoreObj, twoMultiplier = 0, threeMultiplier = 1, fourMultiplier = 2, fiveMultiplier = 3) {
    // Extract properties from scoreObj
    const { player, twos = 0, threes = 0, fours = 0, fives = 0 } = scoreObj;

    if (!player || !["X", "O"].includes(player)) {
        console.error("Invalid player:", player);
        return;
    }

    playerScores.update(scores => {
        // Push current state to history before updating
        history.push(JSON.parse(JSON.stringify(scores)));

        if (!scores[player]) {
            console.error("Player not found in scores:", player);
            return scores;
        }

        scores[player].lines["twos"] = twos;
        scores[player].lines["threes"] = threes;
        scores[player].lines["fours"] = fours;
        scores[player].lines["fives"] = fives;

        // Now, calculate the score based on line counts
        scores[player].score =
            (twoMultiplier * twos) +
            (threeMultiplier * threes) +
            (fourMultiplier * fours) +
            (fiveMultiplier * fives);

        return scores;
    });
}

function rewind() {
    if (history.length > 0) {
        const lastState = history.pop();
        const deepCopy = JSON.parse(JSON.stringify(lastState));
        playerScores.set(deepCopy);
    }
}



export const playerScores = Object.assign(writable({
    "X": {
        score: 0,
        lines: {
            "twos": 0,
            "threes": 0,
            "fours": 0,
            "fives": 0
        }
    },
    "O": {
        score: 0,
        lines: {
            "twos": 0,
            "threes": 0,
            "fours": 0,
            "fives": 0
        }
    }
}), {
    reset: resetPlayerScores,
    updatePlayerScore,
    rewind
});


// Grid State

/**
 * @type {number}
 * The width or height of the square tictactoe grid
 */
export let gridSize = 5;

/**
 * @type {number}
 * The total number of squares in the tictactoegrid
 */
let gridTotalSize = gridSize * gridSize;

/**
 * @typedef { "X" | "O" | null } SquareValue
 * Represents the value of a square: 'X', 'O', or null
 */

/**
 * @typedef Direction
 * @property {("top_bottom"|"top_left_bottom_right"|"left_right"|"bottom_left_top_right")} type
 */

/**
 * @typedef Square
 * @property {SquareValue} value - The value at the grid position.
 * @property {number} row - The row position in the grid.
 * @property {number} col - The column position in the grid.
 * @property {Array<Direction>} [directions] - The directions in which this item is part of a line. Optional property, might not be present in all squares.
 */

/**
 * @type {Square[]}
 * An array containing all the squares in the Tic-Tac-Toe grid
 */
export let gridArrayBuilder = [];

for (let index = 0; index < gridTotalSize; index++) {
    // Calculate the row and column based on the index
    let row = Math.floor(index / gridSize) + 1;
    let col = (index % gridSize) + 1;

    /**
    * @type {Direction[]}
    */
    let directions = [];

    /**
     * @type {Square}
     */
    const square = {
        value: null,
        row: row,
        col: col,
        directions: directions
    };

    gridArrayBuilder.push(square);
}


/**
 * Represents the history of the gridArray store's state
 * @type {Square[][]}
 */
export let gridHistory = [];

/**
 * Rewinds the gridArray state to its previous state
 */
function rewindGrid() {
    if (gridHistory.length > 0) {
        const lastGridState = gridHistory.pop();
        if (Array.isArray(lastGridState)) {
            const deepCopy = JSON.parse(JSON.stringify(lastGridState));
            gridArray.set(deepCopy);
        } else {
            console.error("Invalid grid state in history:", lastGridState);
        }
    }
}


/**
 * Represents the array of squares in the Tic-Tac-Toe grid
 */
export const gridArray = Object.assign(writable(gridArrayBuilder), {
    rewind: rewindGrid
});