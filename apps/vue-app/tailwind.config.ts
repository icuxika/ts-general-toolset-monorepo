import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    // eslint-disable-next-line quotes
    darkMode: ["selector", '[data-theme="dark"]'],
};
export default config;
