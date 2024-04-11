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
        ["button-primary"]: props.type === "primary",
        ["button-info"]: props.type === "info",
        ["button-success"]: props.type === "success",
        ["button-warning"]: props.type === "warning",
        ["button-error"]: props.type === "error",
    };
});
console.log(classes.value);
</script>

<template>
    <button :class="classes" type="button" :disabled="props.disabled">
        <slot></slot>
    </button>
</template>
