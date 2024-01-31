<script setup lang="ts">

</script>

<template>
  <div :class="$style.surface">
    <slot />
  </div>
</template>

<style module>
.surface {
  background: var(--surface);
  border-radius: .5rem;
}
</style>
