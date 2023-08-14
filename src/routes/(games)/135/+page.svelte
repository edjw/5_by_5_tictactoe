<script>
	import GameTitle from "$lib/components/gameTitle.svelte";
	import Turn from "$lib/components/turn.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
</script>

<GameTitle title={"135"} />

<div class="flex flex-col mt-8">
	<Turn />
	<GameGrid twoMultiplier={0} threeMultiplier={1} fourMultiplier={3} fiveMultiplier={5} />
	<ResetGameButton />
</div>

<Rules>
	<li>1 points for a line of 3</li>
	<li>3 points for a line of 4</li>
	<li>5 points for a line of 5</li>
</Rules>

<PlayerScoresTable />
