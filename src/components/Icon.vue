<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string;
    active?: boolean;
    hover?: boolean;
  }>(),
  {
    icon: "menu",
    active: false,
    hover: true,
  }
);

const active = props.active === true ? "var(--active)" : "";
const hover =
  props.hover === true && props.active === false ? "var(--hover)" : active;
</script>

<template>
  <div class="button">
    <span class="material-symbols-rounded">
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
  background: v-bind("active");
  transition: background 0.3s ease;
  cursor: pointer;
}

.button:hover {
  background: v-bind("hover");
}

span {
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
}
</style>
