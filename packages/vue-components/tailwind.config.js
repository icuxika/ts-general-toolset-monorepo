/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    // eslint-disable-next-line quotes
    darkMode: ["selector", '[data-theme="dark"]'],
};
