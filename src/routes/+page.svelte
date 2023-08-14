<script>
	import { gridArray, gridSize } from "$lib/store/store";
	import GridItem from "$lib/components/gridItem.svelte";
	import Rules from "$lib/components/rules.svelte";
	import Turn from "$lib/components/turn.svelte";
	import ResetGameButton from "$lib/components/resetGameButton.svelte";
	import PlayerScoresTable from "$lib/components/playerScoresTable.svelte";
</script>

<Rules>
	<p>1 points for a line of 3</p>
	<p>2 points for a line of 4</p>
	<p>3 points for a line of 5</p>
</Rules>

<div class="flex flex-col mt-8">
	<Turn />

	<section class={`grid grid-cols-${gridSize} content-center justify-items-center min-w-md mt-8`}>
		{#each $gridArray as squareData}
			<GridItem
				{squareData}
				twoMultiplier={0}
				threeMultiplier={1}
				fourMultiplier={2}
				fiveMultiplier={3}
			/>
		{/each}
	</section>

	<ResetGameButton />

	<PlayerScoresTable />
</div>
