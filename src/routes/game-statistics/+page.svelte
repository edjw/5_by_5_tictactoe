<script>
	import { gameStats, allFinalScores } from "$lib/store/scoreHistories";

	import GameHeader from "$lib/components/gameHeader.svelte";

	/** @type {Object<string, number>} */
	let totalGamesForAll = {};

	if ($allFinalScores[0]) {
		/** @type {Object<string, {X: number[], O: number[]}>} */
		const scores = $allFinalScores[0];

		Object.keys(scores).forEach((gameTitle) => {
			totalGamesForAll[gameTitle] = scores[gameTitle].X.length;
		});
	}

	const hasStats = Object.values(totalGamesForAll).some((game) => game > 0);
</script>

<div class="col-span-full flex flex-col px-4 space-y-8">
	<div class="container mx-auto p-6">
		<GameHeader title={"Game Statistics"} />
		<p class="mt-4 text-gray-600">
			This page {hasStats ? "shows" : "will show"} statistics about the results for each of the games
			you've played. It only shows data about games played on this browser (Chrome/Firefox etc) on this
			device.
		</p>
		<p />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
			{#each Object.entries($gameStats) as [gameTitle, stats]}
				<div class="border p-4 rounded shadow">
					<h2 class="text-xl font-semibold mb-2">{gameTitle}</h2>
					<p>
						{totalGamesForAll[gameTitle]}
						{totalGamesForAll[gameTitle] > 1 ? "games" : "game"} played.
					</p>

					<p>
						{#if stats.averageScoreDifference.leader === "X"}
							X beats O by an average of {Math.round(stats.averageScoreDifference.difference)} points.
						{:else if stats.averageScoreDifference.leader === "O"}
							O beats X by an average of {Math.round(stats.averageScoreDifference.difference)} points.
						{:else}
							On average, X and O draw.
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
				</div>
			{/each}
		</div>
	</div>
</div>
