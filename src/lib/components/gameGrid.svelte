<script>
	import FinalScoreDialog from "$lib/components/finalScoreDialog.svelte";
	import GridItem from "$lib/components/gridItem.svelte";
	import { numberOfTurnsTaken } from "$lib/store/store";
	import { gridArray, turn } from "$lib/store/store";
	import { resetGameState } from "$lib/functions/resetGameState";
	import FillAllSquaresButton from "$lib/components/debugFillGridButton.svelte";

	export let twoMultiplier;
	export let threeMultiplier;
	export let fourMultiplier;
	export let fiveMultiplier;
	export let twoGoesForOFirstTurn = false;
	export let countEdgeOnlyTwos = false;
	export let title;

	let isOpen = false;

	$: if ($numberOfTurnsTaken === 25) {
		isOpen = true;
	}

	function handleCloseDialog() {
		isOpen = false;
		resetGameState();
	}
</script>

{#if $numberOfTurnsTaken === 25}
	<FinalScoreDialog {isOpen} closeDialog={handleCloseDialog} />
{/if}

<div class="mb-2">
	<p class="text-4xl md:text-5xl text-center">{$turn}</p>
</div>
<div class="grid grid-cols-12">
	<section
		class="col-start-1 sm:col-start-2 col-span-full sm:col-span-10 grid grid-cols-12 grid-rows-7 mt-8"
	>
		<div
			class="col-start-2 col-span-10 row-start-2 row-span-5 grid grid-cols-5 content-center justify-items-center min-w-[200px] max-w-[350px] mx-auto"
			id="gameGrid"
		>
			{#each $gridArray as squareData}
				<GridItem
					{squareData}
					{twoMultiplier}
					{threeMultiplier}
					{fourMultiplier}
					{fiveMultiplier}
					{twoGoesForOFirstTurn}
					{title}
					{countEdgeOnlyTwos}
				/>
			{/each}
		</div>
	</section>
</div>

<FillAllSquaresButton />
