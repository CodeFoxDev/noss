<script setup lang="ts">
import { layout } from '@/composables/layout';
</script>

<template>
  <div
    class="top"
    v-bind="
      layout({
        pad: '8px',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'space-between',
      })
    "
  >
    <h3 class="title" style="padding: 0.5rem">Search</h3>
    <IconButton :icon="'add'" />
  </div>
  <div class="content"></div>
</template>

<style scoped>
h3.title {
  font-size: 1rem;
  font-weight: 700;
}
</style>
