<script>
	import GameTitle from "$lib/components/gameTitle.svelte";
	import Turn from "$lib/components/turn.svelte";
	import Rules from "$lib/components/rules.svelte";
	import GameGrid from "$lib/components/gameGrid.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
</script>

<GameTitle title={"1357"} />

<div class="flex flex-col mt-8">
	<Turn />
	<GameGrid twoMultiplier={1} threeMultiplier={3} fourMultiplier={5} fiveMultiplier={7} />
	<ResetGameButton />
</div>

<Rules>
	<li>1 point for a line of 2</li>
	<li>3 points for a line of 3</li>
	<li>5 points for a line of 4</li>
	<li>7 points for a line of 5</li>
</Rules>

<PlayerScoresTable showTwos={true} />
