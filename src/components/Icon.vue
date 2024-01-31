<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue';
import { watchEffect, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    icon?: string;
    src?: string;
    active?: boolean | Ref | ComputedRef;
    hover?: boolean;
  }>(),
  {
    icon: 'menu',
    src: '',
    active: false,
    hover: true,
  }
);

let active = ref('');
let hover = ref('var(--hover)');

watchEffect(() => {
  if (props.active) {
    active.value = 'var(--active)';
    hover.value = 'var(--active)';
  } else {
    active.value = '';
    hover.value = props.hover === true ? 'var(--hover)' : '';
  }
});
</script>

<template>
  <div class="button">
    <img v-if="props.src !== ''" :src="props.src" alt="" />
    <span v-else class="material-symbols-rounded">
      {{ props.icon }}
    </span>
  </div>
</template>

<style scoped>
.button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: v-bind('active');
  transition: background 0.3s ease;
  cursor: pointer;
}

.button:hover {
  background: v-bind('hover');
}

span,
img,
svg {
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
