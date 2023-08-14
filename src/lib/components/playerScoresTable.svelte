<script>
	import { playerScores } from "$lib/store/store";
</script>

<section class="flex flex-col space-y-4 mt-8">
	{#each Object.entries($playerScores) as [player, scores]}
		<div class="flex flex-col">
			<p class="font-semibold">
				{player}
			</p>
			<p>Total score: {scores.score}</p>
			{#each Object.entries(scores.lines) as [lineLength, number]}
				<p>
					{lineLength}: {number}
				</p>
			{/each}
		</div>
	{/each}
</section>
