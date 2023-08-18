<script>
	import GameHeader from "$lib/components/gameHeader.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
	import UndoButton from "$lib/components/undoButton.svelte";
	import { allowUndo } from "$lib/store/settings";

	const title = "135";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<GameHeader {title} />

<div class="flex flex-col mt-8 col-span-8">
	<GameGrid twoMultiplier={0} threeMultiplier={1} fourMultiplier={3} fiveMultiplier={5} />
	<div class="flex">
		<ResetGameButton />
		{#if $allowUndo}
			<UndoButton />
		{/if}
	</div>
</div>

<Rules>
	<li>1 points for a line of 3</li>
	<li>3 points for a line of 4</li>
	<li>5 points for a line of 5</li>
</Rules>

<PlayerScoresTable />
