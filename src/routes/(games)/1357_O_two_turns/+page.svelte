<script>
	import GameHeader from "$lib/components/gameHeader.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
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
	/>
	<ResetGameButton />
</div>

<Rules>
	<li>O can fill two squares on their first turn</li>
	<li>1 point for a line of 2</li>
	<li>3 points for a line of 3</li>
	<li>5 points for a line of 4</li>
	<li>7 points for a line of 5</li>
</Rules>

<PlayerScoresTable showTwos={true} />
