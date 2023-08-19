<script>
	import { allFinalScores, averageScores } from "$lib/store/scoreHistories";
</script>

<div class="col-span-full flex flex-col px-4 space-y-8">
	<p>hello</p>

	{#if $allFinalScores.length === 0}
		<p>No scores available.</p>
	{:else}
		{#each $allFinalScores as game}
			<div class="">
				<h2 class="font-semibold">{game.title}</h2>
				<p>X: {game.scores.X.score}</p>
				<p>O: {game.scores.O.score}</p>
                <hr />
			</div>
            <div class="">
				<h2 class="font-semibold mb-4">{game.title}</h2>
				<p>X: {game.scores.X.score}</p>
				<p>O: {game.scores.O.score}</p>
			</div>
		{/each}
	{/if}

	{JSON.stringify($averageScores)}
	{#each Object.keys($averageScores) as title}
		<div>
			<h2>{title}</h2>
			<p>Average Score for X: {$averageScores[title].X.average}</p>
			<p>Average Score for O: {$averageScores[title].O.average}</p>
		</div>
	{/each}
</div>
