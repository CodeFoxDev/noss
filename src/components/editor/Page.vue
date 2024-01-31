<script setup lang="ts">
import type { Tabs } from './types';
import { ref } from 'vue';
import { layout } from '@/directives/layout';
import Layout from '@/components/Layout.vue';
import Surface from '@/components/Surface.vue';
import Icon from '@/components/Icon.vue';

import Explorer from './tabs/Explorer.vue';
import Search from './tabs/Search.vue';

// Pass this to children?
const tabs = ref<Tabs>('explorer');
let last: Tabs;
const collapsed = ref<boolean>(false);
const defaultNavWidth = 320;

const updateTab = (tab: Tabs) => {
  if (tab === tabs.value) toggleCollapse();
  else {
    tabs.value = tab;
    collapsed.value = false;
  }
};

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
  if (collapsed.value === true) {
    last = tabs.value;
    tabs.value = 'collapsed';
  } else {
    tabs.value = last;
  }
};
</script>

<template>
  <Layout :direction="'horizontal'">
    <nav
      v-bind="layout({ direction: 'vertical', gap: '4px', pad: '4px' })"
      :style="{ width: collapsed === true ? '64px' : `${defaultNavWidth}px` }"
      style="height: 100vh"
    >
      <Surface
        class="workspace"
        v-bind="layout({ pad: '8px', gap: '8px', alignItems: 'end' })"
      >
        <div
          class="workspace_select"
          v-show="!collapsed"
          v-bind="layout({ justifyContent: 'space-between' })"
          style="width: 100%; overflow: hidden"
        >
          <Layout :pad="'8px'" :gap="'8px'" :align-items="'center'">
            <div class="workspace_icon"></div>
            <p class="bold">Noss</p>
          </Layout>
          <Icon
            :icon="'expand_more'"
            :hover="false"
            :style="`rotate: ${collapsed === true ? '180deg' : '0deg'}`"
          />
        </div>
        <Icon :icon="'keyboard_double_arrow_left'" @click="toggleCollapse" />
      </Surface>
      <div
        class="current"
        v-bind="layout({ gap: '4px' })"
        style="height: 100%; width: 100%"
      >
        <Surface
          class="toolbar"
          v-bind="
            layout({ direction: 'vertical', justifyContent: 'space-between' })
          "
          style="height: 100%; width: 3.5rem"
        >
          <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
            <Icon
              :icon="'folder'"
              @click="updateTab('explorer')"
              :active="tabs === 'explorer'"
            />
            <Icon
              :icon="'search'"
              @click="updateTab('search')"
              :active="tabs === 'search'"
            />
            <Icon
              :src="'/icons/version_control.svg'"
              @click="updateTab('version_control')"
              :active="tabs === 'version_control'"
            />
            <Icon
              :icon="'error'"
              @click="updateTab('issue')"
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
          v-bind="layout({ direction: 'vertical' })"
          style="height: 100%; width: 100%"
        >
          <Explorer v-if="tabs === 'explorer'" />
          <Search v-else-if="tabs === 'search'" />
        </Surface>
      </div>
    </nav>
    <main v-bind="layout({ direction: 'vertical' })">
      <div class="topbar"></div>
      <div class="editor"></div>
    </main>
  </Layout>
</template>

<style scoped>
nav {
  transition: width 0.3s ease;
}

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
