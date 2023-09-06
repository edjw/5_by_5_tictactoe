<script>
	import GameHeader from "$lib/components/gameHeader.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
	import UndoButton from "$lib/components/undoButton.svelte";
	import { allowUndo, showCurrentScores } from "$lib/store/settings";

	const title = "1357, O plays twice on first turn";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<GameHeader {title} />

<div class="flex flex-col mt-8">
	<GameGrid
		twoMultiplier={1}
		threeMultiplier={3}
		fourMultiplier={5}
		fiveMultiplier={7}
		twoGoesForOFirstTurn={true}
		{title}
	/>
	<div class="flex">
		<ResetGameButton />
		{#if $allowUndo}
			<UndoButton />
		{/if}
	</div>
</div>

<Rules>
	<li>O can fill two squares on their first turn</li>
	<li>1 point for a line of 2</li>
	<li>3 points for a line of 3</li>
	<li>5 points for a line of 4</li>
	<li>7 points for a line of 5</li>
</Rules>

{#if $showCurrentScores}
	<PlayerScoresTable showTwos={true} />
{/if}
