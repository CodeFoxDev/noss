<script setup lang="ts">
import type { Tabs } from "./types";
import { ref } from "vue";
import Layout from "@/components/Layout.vue";
import Workspace from "./Workspace.vue";
import Toolbar from "./Toolbar.vue";

// Pass this to children?
const tabs = ref<Tabs>("explorer");
</script>

<template>
  <Layout :direction="'horizontal'">
    <nav style="width: 320px; height: 100vh">
      <Layout
        :direction="'vertical'"
        :gap="'4px'"
        :pad="'4px'"
        style="width: 100%; height: 100%">
        <Workspace />
        <!-- activity -->
        <Layout :gap="'4px'" style="height: 100%; width: 100%">
          <Toolbar />
        </Layout>
      </Layout>
    </nav>
    <main></main>
  </Layout>
</template>

<style scoped></style>
