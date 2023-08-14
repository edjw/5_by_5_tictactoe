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

<section class="self-start ml-4 mt-4">
	<a class="border pl-2 pr-4 py-2 rounded" href="/">← Back</a>
</section>

<section class="flex flex-col md:self-start mx-2 mt-4 space-y-8">
	<slot />

	<label>
		<input type="checkbox" bind:checked={$showGridLettersNumbers} />
		{$showGridLettersNumbers === true
			? "Hide grid letters and numbers"
			: "Show grid letters and numbers"}
	</label>
</section>
