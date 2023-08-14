<script>
	import GameTitle from "$lib/components/gameTitle.svelte";
	import Turn from "$lib/components/turn.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
</script>

<GameTitle title={"1357"} />

<Turn />

<div class="flex flex-col mt-8">
	<Turn />
	<GameGrid twoMultiplier={1} threeMultiplier={3} fourMultiplier={5} fiveMultiplier={7} />
</div>

<Rules>
	<p>1 point for a line of 2</p>
	<p>3 points for a line of 3</p>
	<p>5 points for a line of 4</p>
	<p>7 points for a line of 5</p>
</Rules>

<ResetGameButton />

<PlayerScoresTable />
