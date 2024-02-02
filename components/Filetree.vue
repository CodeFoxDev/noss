<script setup lang="ts">
import type { Filetree, FiletreeNode } from '@/types/Filetree';
withDefaults(defineProps<{ tree: Filetree }>(), {});
</script>

<template>
  <div class="tree" v-bind="layout({ direction: 'vertical', gap: '4px' })">
    <FiletreeNode
      v-for="(node, index) of $props.tree.files"
      :icon="node.icon"
      :file="node.file"
      :children="node.children"
      :level="0"
    />
  </div>
</template>

<style scoped>
div.tree {
  width: 100%;
}
</style>
