<script>
	import "../app.postcss";
</script>

<!-- <div class="flex flex-col max-w-md md:items-center justify-center mx-auto py-8"> -->
<div
	class="container grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-[100dvh] max-w-xl mx-auto pt-4 pb-8"
>
	<div class="grid grid-cols-12">
		<slot />
	</div>
</div>
