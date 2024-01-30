<script setup lang="ts">
import type { Props } from "./layout";
import { defaults } from "./layout";

const props = withDefaults(defineProps<Props>(), defaults);

const values = {
  direction: props.direction === "horizontal" ? "row" : "column",
};
</script>

<template>
  <div :class="$style.flex">
    <slot />
  </div>
</template>

<style module>
.flex {
  display: flex;
  flex-direction: v-bind("values.direction");
  align-items: v-bind("$props.alignItems");
  justify-content: v-bind("$props.justifyContent");
  gap: v-bind("$props.gap");
  padding: v-bind("$props.pad");
}
</style>
