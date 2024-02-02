<script setup lang="ts">
import type { Filetree, FiletreeNode } from '@/types/Filetree';
const props = withDefaults(
  defineProps<{
    file: string;
    icon?: string;
    active?: boolean;
    level?: number;
    children?: FiletreeNode[];
  }>(),
  {
    icon: 'description',
    active: false,
    level: 0,
  }
);
const expanded = ref<boolean>(false);
const hasChildren = useSlots().default !== undefined;
</script>

<template>
  <div class="tree" v-bind="layout({ direction: 'vertical', gap: '4px' })">
    <div
      class="node"
      v-bind="layout({ alignItems: 'center', justifyContent: 'space-between' })"
      :class="props.active ? 'active' : ''"
    >
      <Layout pad="4px" align-items="center">
        <div class="expand">
          <IconButton
            icon="chevron_right"
            @click="expanded = !expanded"
            hover="var(--active)"
            iconSize="1.25rem"
            size="1.5rem"
            :style="{ rotate: expanded ? '90deg' : '0deg' }"
          />
        </div>
        <Icon :icon="props.icon" size="1.25rem" />
        <p class="name">{{ $props.file }}</p>
      </Layout>
      <Layout class="hover" pad="4px" align-items="center">
        <IconButton
          icon="more_horiz"
          hover="var(--active)"
          iconSize="1.25rem"
          size="1.5rem"
        />
        <IconButton
          icon="add"
          hover="var(--active)"
          iconSize="1.25rem"
          size="1.5rem"
        />
      </Layout>
    </div>
    <div class="slot" v-if="expanded && props.children">
      <FiletreeNode
        v-for="node of props.children"
        :icon="node.icon"
        :file="node.file"
        :children="node.children"
        :level="props.level + 1"
      />
    </div>
    <div class="slot" v-else-if="expanded && hasChildren">
      <slot />
    </div>
    <div class="fallback" v-else-if="expanded">
      <p>No pages inside</p>
    </div>
  </div>
</template>

<style scoped>
div.tree {
  --offset: calc(0.8rem * v-bind('props.level') + 4px);
  width: 100%;
}

div.node {
  cursor: pointer;
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem;
  padding-left: var(--offset) !important;
  transition: background 0.3s ease;

  &:hover {
    background: var(--hover);
  }

  &.active {
    background: var(--active);
  }

  & .expand {
    width: 1.5rem;
    height: 1.5rem;
  }

  & .name {
    margin-left: 0.5rem;
  }
}

div.slot {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

div.fallback {
  padding-left: calc(var(--offset) + 1.5rem + 4px);
  opacity: 0.6;
}
</style>
