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

	function getDirectionClass(direction) {
		const directionClassMapping = {
			top_bottom: "line-top-bottom",
			left_right: "line-left-right",
			top_left_bottom_right: "line-top-left-bottom-right",
			bottom_left_top_right: "line-bottom-left-top-right"
		};
		if (squareData.directions && squareData.directions.includes(direction)) {
			return directionClassMapping[direction];
		}
		return "";
	}
</script>

<div
	class={`relative z-0 flex items-center justify-center w-12 h-12 border rounded my-0.5 md:my-1 mx-2 md:mx-1
    ${squareData.value === "X" ? "bg-red-400 border-red-900" : ""}
    ${squareData.value === "O" ? "bg-blue-400 border-blue-900" : ""}`}
>
	<!-- Top to bottom line -->
	<div
		class={`absolute w-[0.75px] h-full bg-black left-1/2 transform -translate-x-1/2 ${
			squareData.directions.includes("top_bottom") ? "" : "hidden"
		}`}
	/>

	<!-- Left to right line -->
	<div
		class={`absolute w-full h-[0.75px] bg-black top-1/2 transform -translate-y-1/2 ${
			squareData.directions.includes("left_right") ? "" : "hidden"
		}`}
	/>

	<!-- Diagonal line: top-left to bottom-right -->
	<div
		class={`absolute w-[0.75px] h-[64px] bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 ${
			squareData.directions.includes("top_left_bottom_right") ? "" : "hidden"
		}`}
	/>

	<!-- Diagonal line: bottom-left to top-right -->
	<div
		class={`absolute w-[0.75px] h-[64px] bg-black bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 ${
			squareData.directions.includes("bottom_left_top_right") ? "" : "hidden"
		}`}
	/>

	<button
		class="z-10 absolute top-0 left-0 w-full h-full select-none"
		disabled={squareData.value ? true : false}
		on:click={() => chooseSquare(squareData.row, squareData.col)}
	>
		{squareData.value === null ? "" : squareData.value}
	</button>
</div>
