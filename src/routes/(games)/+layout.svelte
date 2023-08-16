<script>
	import { showGridLettersNumbers } from "$lib/store/settings";

	import { resetGameState } from "$lib/functions/resetGameState";

	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		resetGameState();
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
