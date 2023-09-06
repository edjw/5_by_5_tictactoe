<script>
	export let title = "";
</script>

<section class="grid grid-cols-12 col-span-full items-center">
	<!-- Back Button occupying the first two columns -->
	<a class="border py-2 rounded col-span-2 text-center no-underline" href="/"
		>←<span class="hidden md:inline ml-2"> Back</span></a
	>

	<!-- Title spanning the middle 8 columns and centering its content -->
	<div class="col-start-3 col-span-8">
		<p class="font-bold text-lg md:text-xl text-center text-black">{title}</p>
	</div>
</section>
