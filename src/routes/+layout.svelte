<script>
	import "../app.postcss";

	import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center justify-center py-8">
	<nav class="flex space-x-4 mb-8">
		<a href="/" class={$page.route.id === "/" ? "outline px-4 py-2" : "px-4 py-2"}
			>Original</a
		>

		<a href="/135" class={$page.route.id === "/135" ? "outline px-4 py-2" : " px-4 py-2"}
			>1, 3, 5</a
		>
	</nav>
	<slot />
</div>
