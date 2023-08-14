<script>
	import { turn, gridArray, playerScores, numberOfTurnsTaken } from "$lib/store/store";

	import { countAllLinesForPlayer } from "$lib/functions/calculateScores";

	export let squareData;
	export let twoMultiplier = 0;
	export let threeMultiplier = 1;
	export let fourMultiplier = 2;
	export let fiveMultiplier = 3;
	export let twoGoesForOFirstTurn = false;

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

		// hack to allow the game with two goes for O on first turn. numberofTurnsTaken will be 1 for O's first turn, but not its second turn or any other turn
		if (twoGoesForOFirstTurn === false || $numberOfTurnsTaken !== 1) {
			// Switch the turn to the other player
			turn.update((value) => (value === "X" ? "O" : "X"));
		}

		numberOfTurnsTaken.update((value) => value + 1);
	}
</script>

<!-- Todo: apply lines over the buttons "top_bottom"|"top_left_bottom_right"|"left_right"|"bottom_left_top_right" -->

<div
	class="flex items-center justify-center w-12 h-12 border rounded my-0.5 md:my-1 mx-2 md:mx-1
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
