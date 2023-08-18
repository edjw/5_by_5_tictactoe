<script>
	import { titleCase } from "$lib/functions/titleCase";
	import { playerScores } from "$lib/store/store";
	export let showTwos = false;
</script>

<section class="grid grid-cols-10 space-x-4 mt-8 ml-4">
	{#each Object.entries($playerScores) as [player, scores]}
		<div class="flex flex-col col-span-5">
			<p class="font-bold">
				{player}
			</p>
			<p class="font-semibold">
				{scores.score}
				{scores.score === 1 ? "point" : "points"}
			</p>
			<div class="flex flex-col mt-4 col-span-5">
				{#each Object.entries(scores.lines) as [lineLength, number]}
					<p class={showTwos === false && lineLength === "twos" ? "hidden" : ""}>
						{titleCase(lineLength)}: {number}
					</p>
				{/each}
			</div>
		</div>
	{/each}
</section>
