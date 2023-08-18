<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import StaticGridItem from "./staticGridItem.svelte";

	import { resetGameState } from "$lib/functions/resetGameState";
	import { gridArray, playerScores } from "$lib/store/store";

	export let isOpen = false;
	export let closeDialog;

	let dialogElement;

	$: if (isOpen && dialogElement) {
		dialogElement.showModal();
		dialogElement.focus();
	}

	function restartGame() {
		if (closeDialog) closeDialog();
		dialogElement.close();
		resetGameState();
	}

	onMount(() => {
		// Prevent scrolling on the body element when the dialog is open.
		document.body.classList.add("overflow-hidden");

		// Set elements other than the dialog to inert when the dialog is open.
		const setInert = (status) => {
			document.body.childNodes.forEach((node) => {
				if (node !== dialogElement) {
					node.inert = status;
				}
			});
		};

		if (isOpen) {
			setInert(true);
		}

		// Cleanup function to revert changes when the component is destroyed.
		return () => {
			document.body.classList.remove("overflow-hidden");
			setInert(false);
		};
	});
</script>

<dialog
	aria-labelledby="dialog-title"
	bind:this={dialogElement}
	class="fixed inset-0 flex items-center justify-center z-50"
	in:fade={{ duration: 200 }}
>
	<div class="fixed inset-0 w-full h-full bg-gray-800" />

	<div
		class="relative bg-white p-8 md:p-4 rounded w-full md:w-3/4 xl:w-1/2 h-5/6 md:h-3/4 overflow-auto z-60"
	>
		<h2 id="dialog-title" class="text-xl my-4 text-center col-span-full">
			{#if $playerScores["X"].score > $playerScores["O"].score}
				X wins
			{:else if $playerScores["O"].score > $playerScores["X"].score}
				O wins
			{:else}
				That's a draw
			{/if}
		</h2>

		<section class="grid grid-cols-2 space-x-4 mt-8">
			{#each Object.entries($playerScores) as [player, scores]}
				<div class="flex flex-col space-y-2">
					<p class="font-bold text-center text-2xl">
						{player}
					</p>
					<p class="font-semibold text-center">
						{scores.score}
						{scores.score === 1 ? "point" : "points"}
					</p>
				</div>
			{/each}
		</section>

		<section class="col-span-12 sm:col-start-2 sm:col-span-10 grid grid-cols-5 grid-rows-1 mt-8">
			<div
				class="col-span-5 row-start-2 row-span-5 grid grid-cols-5 gap-2 sm:gap-4 content-center justify-items-center w-full mx-auto"
			>
				{#each $gridArray as squareData}
					<StaticGridItem {squareData} />
				{/each}
			</div>
		</section>

		<button on:click={restartGame} class="mt-12 px-2 md:px-4 py-2 rounded border"
			>Start again</button
		>
	</div>
</dialog>
