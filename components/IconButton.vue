<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue';
import { watchEffect, ref } from 'vue';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    icon?: string;
    src?: string;
    active?: boolean | Ref | ComputedRef;
    hover?: boolean | string;
    iconSize?: string;
    size?: string;
  }>(),
  {
    icon: 'menu',
    src: '',
    active: false,
    hover: true,
    iconSize: '1.5rem',
    size: '2.5rem',
  }
);

const iconProps = {
  icon: props.icon,
  src: props.src,
  size: props.iconSize,
};

let active = ref('');
let hover = ref('var(--hover)');

watchEffect(() => {
  if (props.active) {
    active.value = 'var(--active)';
    hover.value = 'var(--active)';
  } else {
    active.value = '';
    hover.value =
      props.hover === true
        ? 'var(--hover)'
        : typeof props.hover === 'string'
        ? props.hover
        : '';
  }
});
</script>

<template>
  <div class="button">
    <Icon v-bind="iconProps" />
  </div>
</template>

<style scoped>
.button {
  width: v-bind('props.size');
  height: v-bind('props.size');
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: v-bind('active');
  transition: background 0.3s ease;
  cursor: pointer;
}

.button:hover {
  background: v-bind('hover');
}
</style>
