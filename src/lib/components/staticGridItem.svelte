<script>
	export let squareData;
</script>

<div
	class={`flex items-center justify-center w-12 h-12 border rounded
    ${squareData.value === "X" ? "bg-red-300 border-red-900" : ""}
    ${squareData.value === "O" ? "bg-blue-300 border-blue-900" : ""}`}
>
	<div class="w-full h-full flex items-center justify-center select-none text-gray-950 col-span-1">
		{squareData.value === null ? "" : squareData.value}
	</div>
</div>
