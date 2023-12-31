/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		"grid-cols-3", "grid-cols-4", "grid-cols-5"
	],

	theme: {
		extend: {
			utilities: {
				'.touch-manipulation': {
					'touch-action': 'manipulation',
				},
			}
		},
	},

	plugins: []
};

module.exports = config;
