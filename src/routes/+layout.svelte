<script lang="ts">
	import "../app.postcss";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div
	class="container grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-[100dvh] max-w-xl mx-auto pt-4 pb-8 prose"
>
	<slot />
</div>
