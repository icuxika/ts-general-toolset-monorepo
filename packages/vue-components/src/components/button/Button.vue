<script lang="ts">
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: "Button",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./types";

const props = withDefaults(defineProps<ButtonProps>(), {
    type: "primary",
    disabled: false,
});
console.log("props", props.type);
const classes = computed(() => {
    return {
        ["bg-indigo-700 hover:enabled:bg-indigo-500 dark:bg-indigo-500 dark:hover:enabled:bg-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"]:
            props.type === "primary",
        ["bg-blue-700 hover:enabled:bg-blue-500 dark:bg-blue-500 dark:hover:enabled:bg-blue-300 disabled:opacity-50  disabled:cursor-not-allowed"]:
            props.type === "info",
        ["bg-green-700 hover:enabled:bg-green-500 dark:bg-green-500 dark:hover:enabled:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed"]:
            props.type === "success",
        ["bg-yellow-700 hover:enabled:bg-yellow-500 dark:bg-yellow-500 dark:hover:enabled:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"]:
            props.type === "warning",
        ["bg-red-700 hover:enabled:bg-red-500 dark:bg-red-500 dark:hover:enabled:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed"]:
            props.type === "error",
    };
});
console.log(classes.value);
</script>

<template>
    <button
        :class="classes"
        class="text-white dark:text-black px-2 py-1 rounded focus:outline-none focus:shadow-outline"
        type="button"
        :disabled="props.disabled"
    >
        <slot></slot>
    </button>
</template>
