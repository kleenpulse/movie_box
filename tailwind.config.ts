import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"hero-bg":
					"linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('/assets/wick-bg.webp')",
			},
			keyframes: {
				"blink-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"blink-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
			},
			animation: {
				blink:
					"blink-in 0.5s ease-in-out infinite alternate-reverse,blink-out 0.5s ease-in-out infinite alternate-reverse",
			},
		},
	},
	plugins: [],
};
export default config;
