<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./types";

defineOptions({
    name: "TButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
    type: "primary",
    disabled: false,
    loading: false,
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
        <svg
            v-if="props.loading"
            class="inline w-4 h-4 me-1 fill-white dark:fill-black animate-spin"
            viewBox="0 0 1024 1024"
            style="
                fill-rule: evenodd;
                clip-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 1.5;
            "
        >
            <path
                d="M512,0L512,0C794.58,0 1024,229.42 1024,512C1024,794.58 794.58,1024 512,1024C229.42,1024 0,794.58 0,512"
                style="
                    fill: transparent;
                    stroke: currentColor;
                    stroke-width: 4rem;
                "
            />
        </svg>
        <slot></slot>
    </button>
</template>
