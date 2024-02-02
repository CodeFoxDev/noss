<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string;
    src?: string;
  }>(),
  {
    icon: 'menu',
    src: '',
  }
);
</script>

<template>
  <div class="icon">
    <img v-if="props.src !== ''" :src="props.src" alt="" />
    <span v-else class="material-symbols-rounded">
      {{ props.icon }}
    </span>
  </div>
</template>

<style scoped>
div.icon {
  width: 1.5rem;
  height: 1.5rem;
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
