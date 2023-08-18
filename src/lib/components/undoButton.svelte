<script>
	import {
		playerScores,
		gridArray,
		turn,
		numberOfTurnsTaken,
		lastUndoneTurn,
		canUndo
	} from "$lib/store/store";

	function handleRewind() {
		const currentTurn = $turn; // Capture the current turn

		if (
			currentTurn !== $lastUndoneTurn &&
			((currentTurn === "O" && $numberOfTurnsTaken % 2 === 1) ||
				(currentTurn === "X" && $numberOfTurnsTaken % 2 === 0))
		) {
			turn.update((value) => (value === "X" ? "O" : "X"));
			numberOfTurnsTaken.update((value) => value - 1);
			playerScores.rewind();
			gridArray.rewind();
			lastUndoneTurn.set(currentTurn); // Mark the captured turn as undone
			canUndo.set(false); // Disable undo after rewind
		}
	}
</script>

{#if $canUndo && $numberOfTurnsTaken > 0}
	<section class="mt-8 ml-4">
		<button
			class="border px-4 py-2 rounded"
			on:click={handleRewind}
			disabled={$turn === $lastUndoneTurn ||
				!(
					($turn === "O" && $numberOfTurnsTaken % 2 === 1) ||
					($turn === "X" && $numberOfTurnsTaken % 2 === 0)
				)}
		>
			Undo</button
		>
	</section>
{/if}
