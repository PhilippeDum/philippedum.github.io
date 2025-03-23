import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		animation: {
			"modal-in": "modalIn 0.3s ease-out",
		},
		keyframes: {
			modalIn: {
				"0%": { transform: "scale(0.95)", opacity: "0" },
				"100%": { transform: "scale(1)", opacity: "1" },
			},
		},
		colors: {
		background: "var(--background)",
		foreground: "var(--foreground)",
		},
    },
    container: {
      center: true,
    }
  },
  plugins: [],
} satisfies Config;
