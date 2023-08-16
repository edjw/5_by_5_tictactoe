<script>
	import { gridArray, numberOfTurnsTaken, playerScores, turn } from "$lib/store/store";

	import { showGridLettersNumbers } from "$lib/store/settings";

	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		gridArray.reset();
		playerScores.reset();
		turn.set("X");
		numberOfTurnsTaken.set(0);
	});
</script>

<section class="flex flex-col mx-2 mt-4 space-y-8 col-span-12">
	<slot />

	<label class="cursor-pointer">
		<input type="checkbox" bind:checked={$showGridLettersNumbers} />
		{$showGridLettersNumbers === true
			? "Hide grid letters and numbers"
			: "Show grid letters and numbers"}
	</label>
</section>
