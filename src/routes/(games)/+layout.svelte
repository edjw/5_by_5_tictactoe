<script>
	import { allowUndo, showCurrentScores } from "$lib/store/settings";

	import { resetGameState } from "$lib/functions/resetGameState";

	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		resetGameState();
	});
</script>

<section class="flex flex-col mx-2 mt-4 space-y-8 col-span-12 touch-manipulation">
	<slot />
	<div class="flex flex-col space-y-8 ml-4">
		<label class="cursor-pointer">
			<input type="checkbox" bind:checked={$allowUndo} class="hidden" />
			<span class="border px-4 py-2 rounded">
				{$allowUndo === true ? "Disable Undo" : "Allow Undo"}
			</span>
		</label>

		<label class="cursor-pointer">
			<input type="checkbox" bind:checked={$showCurrentScores} class="hidden" />
			<span class="border px-4 py-2 rounded">
				{$showCurrentScores === false ? "Show Current Scores" : "Hide Current Scores"}
			</span>
		</label>
	</div>
</section>
