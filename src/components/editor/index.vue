<script setup lang="ts">
import type { Tabs } from './types';
import type { Directive } from 'vue';
import { ref } from 'vue';
import { layout } from '@/directives/layout';
import Layout from '@/components/Layout.vue';
import Workspace from './Workspace.vue';
import Toolbar from './Toolbar.vue';

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
        class="activity"
        :style="layout({ gap: '4px' })"
        style="height: 100%; width: 3.5rem"
      >
        <Toolbar />
      </div>
    </nav>
    <main></main>
  </Layout>
</template>

<style scoped></style>
src/directives/layout
