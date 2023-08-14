<script>
	import { gridArray, gridSize } from "$lib/store/store";
	import GridItem from "$lib/components/gridItem.svelte";

	export let twoMultiplier;
	export let threeMultiplier;
	export let fourMultiplier;
	export let fiveMultiplier;
</script>

<section
	class={`grid grid-cols-${gridSize} content-center justify-items-center min-w-md mt-8 border mx-8`}
>
	{#each $gridArray as squareData}
		<GridItem {squareData} {twoMultiplier} {threeMultiplier} {fourMultiplier} {fiveMultiplier} />
	{/each}
</section>
