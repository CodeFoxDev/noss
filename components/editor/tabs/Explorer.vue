<script setup lang="ts">
import type { Filetree, FiletreeNode } from '@/types/Filetree';
import { layout } from '@/composables/layout';

const tree: Filetree = {
  files: [
    {
      file: 'Home',
    },
    {
      file: 'Design',
      children: [
        {
          file: 'Home',
        },
        {
          file: 'Editor',
          children: [
            {
              file: 'Guidelines',
            },
          ],
        },
      ],
    },
  ],
};
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
    <h3 class="title" style="padding: 0.5rem">Explorer</h3>
    <IconButton :icon="'add'" />
  </div>
  <div
    class="content"
    v-bind="
      layout({
        pad: '8px',
        gap: '4px',
      })
    "
  >
    <Filetree :tree="tree" />
  </div>
</template>

<style scoped>
h3.title {
  font-size: 1rem;
  font-weight: 700;
}
</style>
