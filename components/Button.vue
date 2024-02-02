<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: 'var(--accent)',
  }
);
</script>

<template>
  <div class="button">
    <slot />
  </div>
</template>

<style scoped>
div.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding-inline: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background: v-bind('$props.color');
}
</style>
