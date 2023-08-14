<script>
	import "../app.postcss";
	import { page } from "$app/stores";
	import { gridArray, playerScores, turn } from "$lib/store/store";

	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		gridArray.reset();
		playerScores.reset();
		turn.set("X");
	});
</script>

<div class="flex flex-col items-center justify-center py-8">
	<nav class="flex space-x-4 mb-8">
		<a
			href="/"
			data-sveltekit-reload
			class={$page.route.id === "/" ? "outline px-4 py-2" : "px-4 py-2"}>Original</a
		>

		<a
			href="/135"
			data-sveltekit-reload
			class={$page.route.id === "/135" ? "outline px-4 py-2" : " px-4 py-2"}>1, 3, 5</a
		>

		<a
			href="/1357"
			data-sveltekit-reload
			class={$page.route.id === "/1357" ? "outline px-4 py-2" : " px-4 py-2"}>1, 3, 5, 7</a
		>
	</nav>
	<section>
		<slot />
	</section>
</div>
