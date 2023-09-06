<script lang="ts">
	export let data;
	const { session, supabase, profile } = data;

	console.log(session);
	console.log(supabase);
	console.log(profile);
</script>
