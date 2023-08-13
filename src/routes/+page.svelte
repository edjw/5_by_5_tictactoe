<script>
	import { gridArray, playerScores, turn, gridSize } from "$lib/store/store";
	import GridItem from "$lib/components/gridItem.svelte";
</script>

<div class="flex flex-col">
	<p class="text-center">{$turn}'s turn</p>

	<section class={`grid grid-cols-${gridSize} content-center justify-items-center min-w-md mt-8`}>
		<!-- <section class="grid grid-cols-5 content-center justify-items-center min-w-md"> -->
		{#each $gridArray as squareData}
			<GridItem {squareData} />
		{/each}
	</section>

	<section class="mt-8">
		<button class="border px-4 py-2 rounded" on:click={gridArray.reset}> Start again </button>
	</section>

	<section class="flex flex-col space-y-4 mt-8">
		{#each Object.entries($playerScores) as [player, scores]}
			<div class="flex flex-col">
				<p class="font-semibold">
					{player}
				</p>
				<p>Total score: {scores.score}</p>
				{#each Object.entries(scores.lines) as [lineLength, number]}
					<p>
						{lineLength}: {number}
					</p>
				{/each}
			</div>
		{/each}
	</section>

	<!-- {JSON.stringify($gridArray)} -->
</div>
