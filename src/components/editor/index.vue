<script setup lang="ts">
import type { Tabs } from './types';
import type { Directive } from 'vue';
import { ref } from 'vue';
import { layout } from '@/directives/layout';
import Layout from '@/components/Layout.vue';
import Surface from '@/components/Surface.vue';
import Icon from '@/components/Icon.vue';
import Workspace from './Workspace.vue';

import Explorer from './tabs/Explorer.vue';
import Search from './tabs/Search.vue';

// Pass this to children?
const tabs = ref<Tabs>('explorer');
</script>

<template>
  <Layout :direction="'horizontal'">
    <nav
      :style="layout({ direction: 'vertical', gap: '4px', pad: '4px' })"
      style="width: 320px; height: 100vh"
    >
      <Workspace />
      <div
        class="current"
        :style="layout({ direction: 'horizontal', gap: '4px' })"
        style="height: 100%; width: 100%"
      >
        <Surface
          class="toolbar"
          :style="
            layout({ direction: 'vertical', justifyContent: 'space-between' })
          "
          style="height: 100%; width: 3.5rem"
        >
          <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
            <Icon
              :icon="'folder'"
              @click="tabs = 'explorer'"
              :active="tabs === 'explorer'"
            />
            <Icon
              :icon="'search'"
              @click="tabs = 'search'"
              :active="tabs === 'search'"
            />
            <Icon
              :icon="'error'"
              @click="tabs = 'issue'"
              :active="tabs === 'issue'"
            />
          </Layout>
          <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
            <Icon :icon="'notifications'" />
            <Icon :icon="'settings'" />
          </Layout>
        </Surface>
        <Surface
          class="activity"
          :style="layout({ direction: 'vertical' })"
          style="height: 100%; width: 100%"
        >
          <Explorer v-if="tabs === 'explorer'" />
          <Search v-else-if="tabs === 'search'" />
        </Surface>
      </div>
    </nav>
    <main></main>
  </Layout>
</template>

<style scoped>
h3.title {
  font-size: 1rem;
  font-weight: 700;
}
</style>
