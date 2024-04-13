<script setup lang="ts">
import { useTheme } from "@ts-general-toolset-monorepo/vue-components";

const { theme } = useTheme();
</script>

<template>
    <div
        class="container mx-auto flex flex-col h-screen items-center justify-center"
    >
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
                <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
        </div>
        <div>
            <t-button @click="console.log(1)">Hello, world!</t-button>
            <t-button type="info">Hello, world!</t-button>
            <t-button type="success">Hello, world!</t-button>
            <t-button type="warning">Hello, world!</t-button>
            <t-button type="error">Hello, world!</t-button>
        </div>
        <div>
            <t-button loading @click="console.log(1)">Hello, world!</t-button>
            <t-button loading type="info">Hello, world!</t-button>
            <t-button loading type="success">Hello, world!</t-button>
            <t-button loading type="warning">Hello, world!</t-button>
            <t-button loading type="error">Hello, world!</t-button>
        </div>
        <div>
            <select v-model="theme">
                <option value="os">OS</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
        <div
            class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
        >
            <div>
                <span
                    class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg"
                >
                    <svg
                        class="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    ></svg>
                </span>
            </div>
            <h3
                class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight"
            >
                Writes Upside-Down
            </h3>
            <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                The Zero Gravity Pen can be used to write in any orientation,
                including upside-down. It even works in outer space.
            </p>
        </div>
    </div>
</template>

<style scoped></style>
