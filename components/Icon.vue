<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    src?: string;
    size?: string;
  }>(),
  {
    icon: 'menu',
    src: '',
    size: '1.5rem',
  }
);
</script>

<template>
  <div class="icon">
    <img v-if="props.src !== ''" :src="props.src" alt="" />
    <span
      v-else
      class="material-symbols-rounded"
      :style="{ fontSize: $props.size }"
    >
      {{ props.icon }}
    </span>
  </div>
</template>

<style scoped>
div.icon,
span,
img,
svg {
  width: v-bind('$props.size');
  height: v-bind('$props.size');
  text-align: center;
}

span,
img,
svg {
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
