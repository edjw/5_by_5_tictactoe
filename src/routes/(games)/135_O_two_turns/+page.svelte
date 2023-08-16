<script>
	import GameHeader from "$lib/components/gameHeader.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import Rules from "$lib/components/rules.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
	const title = "135, O plays twice on first turn";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<GameHeader {title} />

<div class="flex flex-col mt-8">
	<GameGrid
		twoMultiplier={0}
		threeMultiplier={1}
		fourMultiplier={2}
		fiveMultiplier={3}
		twoGoesForOFirstTurn={true}
	/>
	<ResetGameButton />
</div>
<Rules>
	<li>O can fill two squares on their first turn</li>
	<li>1 points for a line of 3</li>
	<li>3 points for a line of 4</li>
	<li>5 points for a line of 5</li>
</Rules>

<PlayerScoresTable />
