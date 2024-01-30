<script setup lang="ts">
import type { TabsRef, Tabs } from "./types";
import type { Ref } from "vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

/* const props = defineProps<{
  tabs: Ref<Tabs>;
}>(); */
</script>

<template>
  <Layout
    :class="$style.toolbar"
    :direction="'vertical'"
    :justify-content="'space-between'">
    <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
      <Icon :icon="'folder'" :active="true" />
      <Icon :icon="'search'" />
      <Icon :icon="'error'" />
    </Layout>
    <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
      <Icon :icon="'notifications'" />
      <Icon :icon="'settings'" />
    </Layout>
  </Layout>
</template>

<style module>
.toolbar {
  background: var(--surface);
  height: 100%;
  border-radius: 0.5rem;
}
</style>
