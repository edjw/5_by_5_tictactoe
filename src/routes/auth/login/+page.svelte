<script lang="ts">
	import { Auth } from "@supabase/auth-ui-svelte";
	export let data;
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<!-- <section> -->
<Auth
	supabaseClient={data.supabase}
	view="magic_link"
	redirectTo={`${data.url}/auth/callback`}
	showLinks={false}
	appearance={{
		extend: false,
		className: {
			container: "flex flex-col space-y-4 max-w-[300px]",
			anchor: "",
			button: "!rounded !py-2 !px-4",
			input: "block rounded !border py-2 px-2 min-w-full",
			label: "text-sm",
			divider: "",
			loader: "",
			message: "bg-green-300 rounded px-4 py-2"
		}
	}}
/>
