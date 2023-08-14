<script>
	let games = [
		{
			title: "123",
			link: "/123",
			description: "1 point for a line of 3, 2 for 4, 3 for 5"
		},
		{
			title: "135",
			link: "/135",
			description: "1 point for a line of 3, 3 for 4, 5 for 5 (best so far)"
		},
		{
			title: "1357",
			link: "/1357",
			description: "1 point for a line of 2, 3 for 3, 5 for 4, 7 for 5"
		}
	];
</script>

<div class="flex flex-col px-4 space-y-8">
	<h1 class="text-3xl">5-by-5 games</h1>
	<nav class="flex flex-col space-y-6">
		{#each games as game}
			<section>
				<a href={game.link} data-sveltekit-reload class="underline font-semibold text-xl">{game.title}</a>
				<p>{game.description}</p>
			</section>
		{/each}
	</nav>
</div>
