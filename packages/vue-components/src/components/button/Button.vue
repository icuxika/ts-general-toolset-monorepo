<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./types";

defineOptions({
    name: "TButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
    type: "primary",
    disabled: false,
});
const classes = computed(() => {
    return {
        ["button-primary"]: props.type === "primary",
        ["button-info"]: props.type === "info",
        ["button-success"]: props.type === "success",
        ["button-warning"]: props.type === "warning",
        ["button-error"]: props.type === "error",
    };
});
</script>

<template>
    <button :class="classes" type="button" :disabled="props.disabled">
        <slot></slot>
    </button>
</template>
