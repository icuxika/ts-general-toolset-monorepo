import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4338ca",
                    light: "#4338ca",
                    dark: "#6366f1",
                },
                info: {
                    DEFAULT: "#1d4ed8",
                    light: "#1d4ed8",
                    dark: "#3b82f6",
                },
                success: {
                    DEFAULT: "#15803d",
                    light: "#15803d",
                    dark: "#22c55e",
                },
                warning: {
                    DEFAULT: "#eab308",
                    light: "#eab308",
                    dark: "#eab308",
                },
                error: {
                    DEFAULT: "#b91c1c",
                    light: "#b91c1c",
                    dark: "#ef4444",
                },
            },
        },
    },
    plugins: [],
    // eslint-disable-next-line quotes
    darkMode: ["selector", '[data-theme="dark"]'],
};
export default config;
