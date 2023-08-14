<script>
	import { gridArray, turn } from "$lib/store/store";
	import { showGridLettersNumbers } from "$lib/store/settings";
	import GridItem from "$lib/components/gridItem.svelte";

	export let twoMultiplier;
	export let threeMultiplier;
	export let fourMultiplier;
	export let fiveMultiplier;
	export let twoGoesForOFirstTurn = false;

	let letters = ["A", "B", "C", "D", "E"];
	let numbers = [5, 4, 3, 2, 1];
</script>

<section class="grid grid-cols-6 grid-rows-7 min-w-md mt-8 mx-8">
	<div class="col-start-4 mb-4">
		<p class="text-5xl text-center">{$turn}</p>
	</div>
	<!-- Main Grid -->
	<div
		class="col-start-2 col-span-5 row-start-2 row-span-5 grid grid-cols-5 content-center justify-items-center border"
	>
		{#each $gridArray as squareData}
			<GridItem
				{squareData}
				{twoMultiplier}
				{threeMultiplier}
				{fourMultiplier}
				{fiveMultiplier}
				{twoGoesForOFirstTurn}
			/>
		{/each}
	</div>

	{#if $showGridLettersNumbers === true}
		<!-- Column Letters -->
		<div
			class="col-start-2 col-span-5 row-start-7 grid grid-cols-5 content-center justify-items-center"
		>
			{#each letters as letter}
				<span class="text-center text-xs">{letter}</span>
			{/each}
		</div>

		<!-- Row Numbers -->
		<div
			class="col-start-1 row-start-1 row-span-5 grid grid-rows-5 content-center justify-items-center"
		>
			{#each numbers as number}
				<span class="flex items-center justify-center h-full text-xs">{number}</span>
			{/each}
		</div>
	{/if}
</section>
