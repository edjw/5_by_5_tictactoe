<script>
	import {
		turn,
		gridArray,
		gridHistory,
		playerScores,
		numberOfTurnsTaken,
		lastUndoneTurn,
		canUndo
	} from "$lib/store/store";

	import { countAllLinesForPlayer } from "$lib/functions/calculateScores";
	import { saveFinalScores } from "$lib/store/scoreHistories";

	export let squareData;
	export let twoMultiplier = 0;
	export let threeMultiplier = 1;
	export let fourMultiplier = 2;
	export let fiveMultiplier = 3;
	export let twoGoesForOFirstTurn = false;
	export let title;
	export let countEdgeOnlyTwos;

	/**
	 * @param {number} targetRow - The target row of the square to update
	 * @param {number} targetCol - The target column of the square to update
	 */
	function chooseSquare(targetRow, targetCol) {
		// Push current grid state to gridHistory before updating
		gridHistory.push(JSON.parse(JSON.stringify($gridArray)));

		// Reset the last undone turn after a new move
		lastUndoneTurn.set(null);

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

		const liveRegion = document.getElementById("liveRegion");
		if (!liveRegion) {
			return;
		}
		liveRegion.textContent = `Cell at row ${targetRow} and column ${targetCol} has been chosen.`;

		// Count the current scores
		const currentPlayerScore = countAllLinesForPlayer($gridArray, $turn, {
			countEdgeOnlyTwos: countEdgeOnlyTwos
		});

		// Update playerScores based on the current player and their score
		playerScores.updatePlayerScore(
			currentPlayerScore,
			twoMultiplier,
			threeMultiplier,
			fourMultiplier,
			fiveMultiplier
		);

		// hack to allow the game with two goes for O on first turn. numberofTurnsTaken will be 1 for O's first turn, but not its second turn or any other turn
		if (twoGoesForOFirstTurn === false || $numberOfTurnsTaken !== 1) {
			// Switch the turn to the other player
			turn.update((value) => (value === "X" ? "O" : "X"));
		}

		canUndo.set(true); // Enable undo after a new move
		numberOfTurnsTaken.update((value) => value + 1);

		try {
			if ($numberOfTurnsTaken === 25) {
				saveFinalScores(title, {
					X: $playerScores.X.score,
					O: $playerScores.O.score
				});
			}
		} catch (error) {
			console.error("Failed to save final scores:", error);
		}
	}
</script>

<div
	class={`flex items-center justify-center w-12 h-12 border rounded
    ${squareData.value === "X" ? "bg-red-300 border-red-900" : ""}
    ${squareData.value === "O" ? "bg-blue-300 border-blue-900" : ""}`}
	role="gridcell"
>
	<button
		class="w-full h-full select-none text-gray-950"
		disabled={squareData.value ? true : false}
		aria-label={`Cell at row ${squareData.row} and column ${squareData.col}`}
		on:click={() => chooseSquare(squareData.row, squareData.col)}
	>
		{squareData.value === null ? "" : squareData.value}
	</button>
</div>
