<script>
	import { gridArray, playerScores, turn } from "$lib/store/store";

	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		gridArray.reset();
		playerScores.reset();
		turn.set("X");
	});
</script>

<section class="self-start ml-4 mt-4">
	<a class="border pl-2 pr-4 py-2 rounded" href="/">← Back</a>
</section>

<section class="md:self-start mx-2 mt-4">
	<slot />
</section>
