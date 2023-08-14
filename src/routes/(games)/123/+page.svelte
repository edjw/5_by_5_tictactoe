<script>
	import GameTitle from "$lib/components/gameTitle.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import Rules from "$lib/components/rules.svelte";
	import Turn from "$lib/components/turn.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
</script>

<GameTitle title={"123"} />

<div class="flex flex-col mt-8">
	<Turn />
	<GameGrid twoMultiplier={0} threeMultiplier={1} fourMultiplier={2} fiveMultiplier={3} />
</div>
<Rules>
	<p>1 points for a line of 3</p>
	<p>2 points for a line of 4</p>
	<p>3 points for a line of 5</p>
</Rules>

<ResetGameButton />

<PlayerScoresTable />
