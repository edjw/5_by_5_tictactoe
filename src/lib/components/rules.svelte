<section class="mt-4 ml-4">
	<details class="font-semibold flex flex-col space-y-4">
		<summary class="cursor-pointer">Show Rules</summary>
		<ul class="font-normal list-disc list-inside">
			<slot />
		</ul>
		<p class="font-normal">Scores are calculated by counting the lines at the end of the game. The scores below are current scores and can change at any time until the end. A line of 3 that becomes a line of 4 on the final turn counts as a 4, not both a 3 and a 4.</p>
	</details>
</section>
