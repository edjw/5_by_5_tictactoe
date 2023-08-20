<script>
	let isDev = import.meta.env.DEV;

	/**
	 * Shuffles an array using the Fisher-Yates algorithm.
	 * @param {any[]} array - The array to shuffle.
	 * @returns {void}
	 */
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	/**
	 * Shuffles and clicks all buttons inside the "gameGrid" container.
	 * @returns {void}
	 */
	function clickAllButtons() {
		const container = document.querySelector("div#gameGrid");
		if (!container) return;

		const buttons = Array.from(container.querySelectorAll("button"));
		shuffleArray(buttons);
		buttons.forEach((button) => button.click());
	}
</script>

{#if isDev}
	<section class="ml-4">
		<button class="font-bold py-2 px-4 rounded border mb-4" on:click={clickAllButtons}>
			Play a randomised game
		</button>
	</section>
{/if}
