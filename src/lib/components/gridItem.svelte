<script>
	import { turn, gridArray, playerScores } from "$lib/store/store";

	export let squareData;
	export let twoMultiplier = 0;
	export let threeMultiplier = 1;
	export let fourMultiplier = 2;
	export let fiveMultiplier = 3;

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

	function createMatrix(gridArray) {
		let matrix = [];
		gridArray.forEach((item) => {
			if (!matrix[item.row - 1]) matrix[item.row - 1] = [];
			matrix[item.row - 1][item.col - 1] = item; // Store the whole object, not just the value
		});
		return matrix;
	}

	function checkLine(matrix, startRow, startCol, dx, dy, length, player) {
		let line = [];
		for (let i = 0; i < length; i++) {
			const x = startRow + dx * i;
			const y = startCol + dy * i;

			if (
				x < 0 ||
				x >= matrix.length ||
				y < 0 ||
				y >= matrix[0].length ||
				matrix[x][y].value !== player
			) {
				return null;
			}
			line.push(matrix[x][y]); // Get the whole Square object
		}

		// Derive a string identifier for the direction
		let directionType;
		if (dx === 1 && dy === 0) {
			directionType = "top_bottom";
		} else if (dx === 0 && dy === 1) {
			directionType = "left_right";
		} else if (dx === 1 && dy === 1) {
			directionType = "top_left_bottom_right";
		} else {
			directionType = "bottom_left_top_right";
		}

		// Update directions property of each square in the line
		line.forEach((square) => {
			if (!square.directions.includes(directionType)) {
				square.directions.push(directionType);
			}
		});

		return { line: line, directionType: directionType };
	}

	function gatherLines(matrix, player) {
		let allLines = [];
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				const directions = [
					{ dx: 1, dy: 0 }, // Vertical
					{ dx: 0, dy: 1 }, // Horizontal
					{ dx: 1, dy: 1 }, // Diagonal Right Down
					{ dx: 1, dy: -1 } // Diagonal Left Down
				];

				for (const direction of directions) {
					for (let length = 5; length >= 2; length--) {
						const line = checkLine(matrix, i, j, direction.dx, direction.dy, length, player);
						if (line) {
							allLines.push(line);
						}
					}
				}
			}
		}
		return allLines;
	}

	function filterLines(lines) {
		// Sort lines by length, longest first
		lines.sort((a, b) => b.line.length - a.line.length);

		let acceptedLines = [];

		for (let line of lines) {
			let isSubset = false;

			// Check if line is a subset of any accepted line
			for (let acceptedLine of acceptedLines) {
				if (isLineSubset(line, acceptedLine)) {
					isSubset = true;
					break;
				}
			}

			if (!isSubset) {
				acceptedLines.push(line);
			}
		}

		return acceptedLines;
	}

	function isLineSubset(lineA, lineB) {
		return lineA.line.every((pointA) => {
			return lineB.line.some((pointB) => pointA.row === pointB.row && pointA.col === pointB.col);
		});
	}
	function countAllLinesForPlayer(gridArray, player) {
		const matrix = createMatrix(gridArray);
		const lines = gatherLines(matrix, player);
		const filteredLines = filterLines(lines);

		const counts = {
			twos: 0,
			threes: 0,
			fours: 0,
			fives: 0,
			player: player
		};

		filteredLines.forEach((line) => {
			switch (line.line.length) {
				case 2:
					counts.twos++;
					break;
				case 3:
					counts.threes++;
					break;
				case 4:
					counts.fours++;
					break;
				case 5:
					counts.fives++;
					break;
			}
		});

		return counts;
	}

	/**
	 * @param {number} targetRow - The target row of the square to update
	 * @param {number} targetCol - The target column of the square to update
	 */
	function chooseSquare(targetRow, targetCol) {
		// Update the grid data
		gridArray.update((arr) => {
			return arr.map((square) => {
				if (square.row === targetRow && square.col === targetCol) {
					return {
						...square,
						value: $turn
					};
				}
				return square;
			});
		});

		// Count the current scores
		const currentPlayerScore = countAllLinesForPlayer($gridArray, $turn);

		// Update playerScores based on the current player and their score
		playerScores.updatePlayerScore(
			currentPlayerScore,
			twoMultiplier,
			threeMultiplier,
			fourMultiplier,
			fiveMultiplier
		);

		// Switch the turn to the other player
		turn.update((value) => (value === "X" ? "O" : "X"));
	}
</script>

<!-- Todo: apply lines over the buttons "top_bottom"|"top_left_bottom_right"|"left_right"|"bottom_left_top_right" -->

<div
	class="flex items-center justify-center w-12 h-12 m-0.5 border rounded
    {squareData.value === 'X' ? 'bg-red-400 border-red-900' : ''}
    {squareData.value === 'O' ? 'bg-blue-400 border-blue-900' : ''}"
>
	<button
		class={`w-full h-full`}
		disabled={squareData.value ? true : false}
		on:click={() => chooseSquare(squareData.row, squareData.col)}
	>
		{squareData.value === null ? "" : squareData.value}
	</button>
</div>

<!-- <p>${JSON.stringify(squareData.directions)}</p> -->
