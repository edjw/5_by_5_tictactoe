/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		"grid-cols-3", "grid-cols-4", "grid-cols-5", "bg-red-400", "bg-blue-400", "border-red-900", "border-blue-900"
	],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
