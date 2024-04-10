<script lang="ts">
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: "Button",
};
</script>
<script setup lang="ts"></script>

<template>
    <button
        class="bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
    >
        <slot></slot>
    </button>
</template>
