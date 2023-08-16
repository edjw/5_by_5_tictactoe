<script>
	import GameHeader from "$lib/components/gameHeader.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import Rules from "$lib/components/rules.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";

	const title = "123";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<GameHeader {title} />

<div class="mt-8">
	<GameGrid twoMultiplier={0} threeMultiplier={1} fourMultiplier={2} fiveMultiplier={3} />
	<ResetGameButton />
</div>
<Rules>
	<li>1 points for a line of 3</li>
	<li>2 points for a line of 4</li>
	<li>3 points for a line of 5</li>
</Rules>

<PlayerScoresTable />
