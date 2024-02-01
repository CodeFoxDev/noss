<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    fill?: boolean;
  }>(),
  {
    fill: false,
  }
);
</script>

<template>
  <div
    :class="$style.surface"
    :style="{
      height: $props.fill ? '100%' : '',
      width: $props.fill ? '100%' : '',
    }"
  >
    <slot />
  </div>
</template>

<style module>
.surface {
  background: var(--surface);
  border-radius: 0.5rem;
}
</style>
