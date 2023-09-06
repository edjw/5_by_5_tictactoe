<script>
	import { games } from "$lib/store/pages";
	import SiteHeader from "$lib/components/siteHeader.svelte";
</script>

<div class="col-span-full flex flex-col px-4 space-y-8">
	<SiteHeader />
	<nav class="flex flex-col space-y-6">
		{#each games as game}
			<section>
				<a href={game.link} data-sveltekit-reload class="underline font-semibold text-xl"
					>{game.title}</a
				>
				<p>{@html game.description}</p>
			</section>
		{/each}
		<hr />
		<section>
			<a href="/game-statistics" data-sveltekit-reload class="underline font-semibold text-xl"
				>Game statistics</a
			>
			<p>See a summary of statistics about each game</p>
		</section>
	</nav>
</div>
