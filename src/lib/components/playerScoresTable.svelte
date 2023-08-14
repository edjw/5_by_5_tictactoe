<script>
	import { playerScores } from "$lib/store/store";
</script>

<section class="grid grid-cols-2 space-x-4 mt-8">
	{#each Object.entries($playerScores) as [player, scores]}
		<div class="flex flex-col space-y-0.5">
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
