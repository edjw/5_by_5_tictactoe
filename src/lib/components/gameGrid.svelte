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

	let isFinalScoreDialogOpen = false;

	$: if ($numberOfTurnsTaken === 25) {
		isFinalScoreDialogOpen = true;
	}

	function handleCloseDialog() {
		isFinalScoreDialogOpen = false;
		resetGameState();
	}
</script>

{#if $numberOfTurnsTaken === 25}
	<FinalScoreDialog isOpen={isFinalScoreDialogOpen} closeDialog={handleCloseDialog} />
{/if}

<div class="mb-2">
	<p class="text-4xl md:text-5xl text-center">{$turn}</p>
</div>

<div class="grid grid-cols-12">
	<div
		class="col-start-1 sm:col-start-2 lg:col-start-3 xl:col-start-4 col-span-full sm:col-span-10 lg:col-span-8 xl:col-span-6 grid grid-cols-5 justify-items-center items-center gap-2 w-[17rem] mx-auto"
		id="gameGrid"
		role="grid"
		aria-roledescription="a 5 by 5 grid"
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
</div>

<div aria-live="polite" class="sr-only" id="liveRegion" />
