<script>
	import { gameStats, resetAllFinalScores, totalGamesForAll } from "$lib/store/scoreHistories";
	import GameHeader from "$lib/components/gameHeader.svelte";

	let hasStats = false;

	$: {
		hasStats = Object.values($totalGamesForAll).some((value) => value > 0);
	}
</script>

<div class="col-span-full flex flex-col px-4 space-y-8">
	<div class="container mx-auto p-6">
		<GameHeader title={"Game Statistics"} />
		<p class="mt-4 text-gray-600">
			This page is for statistics about the results for each of the game types you've played. It
			only shows data about games played on this browser (Chrome/Firefox etc) on this device.
		</p>
		<p />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
			{#each Object.entries($gameStats) as [gameTitle, stats]}
				<section class="border p-4 rounded shadow">
					<h2 class="text-xl font-semibold mb-2">{gameTitle}</h2>
					<p>
						In the {$totalGamesForAll[gameTitle]}
						{$totalGamesForAll[gameTitle] === 1 ? "game" : "games"} played so far,
						{#if stats.averageScoreDifference.leader === "X"}
							X {$totalGamesForAll[gameTitle] === 1 ? "beat" : "beats"} O by an average of {Math.round(
								stats.averageScoreDifference.difference
							)}
							{Math.round(stats.averageScoreDifference.difference) === 1 ? "point" : "points"}
							{$totalGamesForAll[gameTitle] === 1 ? ". Play more games to create an average." : "."}
						{:else if stats.averageScoreDifference.leader === "O"}
							O {$totalGamesForAll[gameTitle] === 1 ? "beat" : "beats"} X by an average of {Math.round(
								stats.averageScoreDifference.difference
							)}
							{Math.round(stats.averageScoreDifference.difference) === 1 ? "point" : "points"}
							{$totalGamesForAll[gameTitle] === 1 ? ". Play more games to create an average." : "."}
						{:else}
							{$totalGamesForAll[gameTitle] === 1
								? "X and O drew. Play more games to create an average."
								: "On average, X and O draw."}
						{/if}
					</p>

					{#if !isNaN(stats.xWinPercentage) && !isNaN(stats.oWinPercentage) && !isNaN(stats.drawPercentage)}
						<ul class="mt-4">
							<li class="mb-2">
								<strong>X won:</strong>
								{Math.round(stats.xWinPercentage)}%
							</li>
							<li class="mb-2">
								<strong>O won:</strong>
								{Math.round(stats.oWinPercentage)}%
							</li>
							<li class="mb-2">
								<strong>Draw:</strong>
								{Math.round(stats.drawPercentage)}%
							</li>
						</ul>
					{:else}
						<p>No scores yet</p>
					{/if}
				</section>
			{/each}
		</div>
	</div>

	{#if hasStats}
		<section>
			<button class="border px-4 py-2 rounded" on:click={resetAllFinalScores}
				>Reset all statistics</button
			>
		</section>
	{/if}
</div>
