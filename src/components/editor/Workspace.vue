<script setup>
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
  <Layout :class="nav.workspace" :pad="'8px'" :gap="'8px'">
    <Layout
      :class="nav.workspace_select"
      style="width: 100%"
      :justify-content="'space-between'">
      <Layout :pad="'8px'" :gap="'8px'" :align-items="'center'">
        <div :class="nav.workspace_icon"></div>
        <p class="bold">Noss</p>
      </Layout>
      <Icon :icon="'expand_more'" :hover="false" />
    </Layout>
    <Layout class="workspace close">
      <Icon :icon="'keyboard_double_arrow_left'" />
    </Layout>
  </Layout>
</template>

<style module="nav">
.workspace {
  width: 100%;
  height: 3.5rem;
  background: var(--surface);
  border-radius: 0.5rem;
}

.workspace_select {
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.3s ease;
}

.workspace_select:hover {
  background: var(--hover);
}

.workspace_icon {
  width: 1.5rem;
  height: 1.5rem;
  background: var(--accent);
}
</style>
