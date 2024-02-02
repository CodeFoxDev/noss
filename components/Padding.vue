<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    pad?: string;
  }>(),
  {
    pad: '4px',
  }
);
</script>

<template>
  <div :style="{ padding: $props.pad }">
    <slot />
  </div>
</template>
