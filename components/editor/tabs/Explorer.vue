<script setup lang="ts">
import IconButton from '@/components/editor/IconButton.vue';
import { layout } from '@/composables/layout';
</script>

<template>
  <div
    class="top"
    v-bind:style="
      layout({
        pad: '8px',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }).style
    "
  >
    <h3 class="title" style="padding: 0.5rem">Explorer</h3>
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
