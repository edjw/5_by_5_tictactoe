<!-- After a user is signed in, they need to be able to edit their profile details and manage their account. -->

<!--
    This page shows how to check if a user is signed in, and how to use the session data to populate a form.
-->

<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? "";
	let username: string = profile?.username ?? "";
	let website: string = profile?.website ?? "";
	let avatarUrl: string = profile?.avatar_url ?? "";

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="flex flex-col space-y-4">
	<form
		class="flex flex-col space-y-4"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div class="flex flex-col max-w-xs">
			<label class="text-sm" for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div class="flex flex-col max-w-xs">
			<label class="text-sm" for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div class="flex flex-col max-w-xs">
			<label class="text-sm" for="username">Username</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div class="flex flex-col max-w-xs">
			<label class="text-sm" for="website">Website</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<button class="border px-4 py-2 rounded" type="submit" disabled={loading}>
				{loading ? "Loading..." : "Update"}
			</button>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="border px-4 py-2 rounded" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
