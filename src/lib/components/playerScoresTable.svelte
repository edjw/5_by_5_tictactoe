<script>
	import { titleCase } from "$lib/functions/titleCase";
	import { playerScores } from "$lib/store/store";
	export let showTwos = false;
</script>

<section class="grid grid-cols-2 space-x-4 mt-8">
	{#each Object.entries($playerScores) as [player, scores]}
		<div class="flex flex-col space-y-4">
			<p class="font-semibold">
				{player} – <span class="font-bold">{scores.score}</span>
				{scores.score === 1 ? "point" : "points"}
			</p>
			<div class="flex flex-col">
				{#each Object.entries(scores.lines) as [lineLength, number]}
					<p class={showTwos === false && lineLength === "twos" ? "hidden" : ""}>
						{titleCase(lineLength)}: {number}
					</p>
				{/each}
			</div>
		</div>
	{/each}
</section>
