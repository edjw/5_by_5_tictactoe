<script>
	import "../app.postcss";

	import { page } from "$app/stores";
	import { gridArray, playerScores, turn } from "$lib/store/store";


	// Reset states when change game type
	import { onMount } from "svelte";

	onMount(() => {
		gridArray.reset();
		playerScores.reset();
		turn.set("X");
	});

	// import { io } from "$lib/webSocketConnection.js";
	// import { onMount } from "svelte";

	// let textfield = "";
	// let username = "";

	// let messages = [];
	// onMount(() => {
	// 	io.on("message", (message) => {
	// 		messages = [...messages, message];
	// 	});
	// 	io.on("name", (name) => {
	// 		username = name;
	// 	});
	// });

	// function sendMessage() {
	// 	const message = textfield.trim();
	// 	if (!message) return;

	// 	textfield = "";
	// 	io.emit("message", message);
	// }

	// $: {
	// 	// send message to server
	// 	socket.emit("eventFromClient", $reactiveValue);
	// }
</script>

<div class="flex flex-col items-center justify-center py-8">
	<nav class="flex space-x-4 mb-8">
		<a
			href="/"
			data-sveltekit-reload
			class={$page.route.id === "/" ? "outline px-4 py-2" : "px-4 py-2"}>Original</a
		>

		<a
			href="/135"
			data-sveltekit-reload
			class={$page.route.id === "/135" ? "outline px-4 py-2" : " px-4 py-2"}>1, 3, 5</a
		>
	</nav>
	<slot />
</div>

<!-- <div class="h-screen w-screen bg-zinc-800">
	<div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
		<header
			class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
		>
			<span class="font-bold text-xl">My Chat app</span>
			<span>{username}</span>
		</header>

		<div class="h-full w-full p-4">
			{#each messages as message}
				<div class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit">
					<span class="flex items-center space-between gap-4">
						<b>{message.from}</b>
						<i>{message.time}</i>
					</span>
					{message.message}
				</div>
			{/each}
		</div>

		<form
			action="#"
			on:submit|preventDefault={sendMessage}
			class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
		>
			<input
				type="text"
				bind:value={textfield}
				placeholder="Type something..."
				class="bg-transparent border-none px-4 py-3 w-full"
			/>
			<button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button>
		</form>
	</div>
</div> -->
