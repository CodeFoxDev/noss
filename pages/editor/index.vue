<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { layout } from '@/composables/layout';

import Explorer from '@/components/editor/tabs/Explorer.vue';
import Search from '@/components/editor/tabs/Search.vue';

type Tabs = 'explorer' | 'search' | 'version_control' | 'issue';

// Pass this to children?
const tabs = ref<Tabs>('explorer');
const collapsed = ref<boolean>(false);
const secondaryCollapsed = ref<boolean>(true);
const defaultNavWidth = 320;
let viewWidthUpdated = false;

const updateTab = (tab: Tabs) => {
  if (tab === tabs.value) toggleNav();
  else {
    tabs.value = tab;
    collapsed.value = false;
  }
};

const toggleNav = () => (collapsed.value = !collapsed.value);
const toggleSecondary = () => {
  secondaryCollapsed.value = !secondaryCollapsed.value;
  if (window.innerWidth < 1200) collapsed.value = true;
};

onMounted(() => {
  addEventListener('resize', () => {
    if (
      window.innerWidth < 1200 &&
      !viewWidthUpdated &&
      collapsed.value === false
    ) {
      collapsed.value = true;
      viewWidthUpdated = true;
    } else if (window.innerWidth > 1200 && viewWidthUpdated) {
      collapsed.value = false;
      viewWidthUpdated = false;
    }
  });
});
</script>

<template>
  <ClientOnly>
    <Layout direction="horizontal" style="height: 100vh; width: 100vw">
      <nav
        v-bind="layout({ direction: 'vertical', gap: '4px', pad: '4px' })"
        :style="{ width: collapsed === true ? '64px' : `${defaultNavWidth}px` }"
        style="height: 100vh"
      >
        <!-- Make the right side of nav resizeable -->
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
            <IconButton
              :icon="'expand_more'"
              :hover="false"
              :style="`rotate: ${collapsed === true ? '180deg' : '0deg'}`"
            />
          </div>
          <IconButton :icon="'keyboard_double_arrow_left'" @click="toggleNav" />
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
              <IconButton
                :icon="'folder'"
                @click="updateTab('explorer')"
                :active="tabs === 'explorer'"
              />
              <IconButton
                :icon="'search'"
                @click="updateTab('search')"
                :active="tabs === 'search'"
              />
              <IconButton
                :src="'/icons/version_control.svg'"
                @click="updateTab('version_control')"
                :active="tabs === 'version_control'"
              />
              <IconButton
                :icon="'error'"
                @click="updateTab('issue')"
                :active="tabs === 'issue'"
              />
            </Layout>
            <Layout :direction="'vertical'" :gap="'8px'" :pad="'8px'">
              <IconButton :icon="'notifications'" />
              <IconButton :icon="'settings'" />
            </Layout>
          </Surface>
          <Surface
            class="activity"
            v-bind="layout({ direction: 'vertical' })"
            style="height: 100%; width: 100%"
          >
            <div v-if="collapsed === true"></div>
            <Explorer v-else-if="tabs === 'explorer'" />
            <Search v-else-if="tabs === 'search'" />
          </Surface>
        </div>
      </nav>
      <main v-bind="layout({ direction: 'vertical' })">
        <div
          class="topbar"
          v-bind="
            layout({
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              pad: '4px',
            })
          "
        >
          <div
            class="path"
            v-bind="layout({ alignItems: 'center', gap: '4px', pad: '8px' })"
          >
            <span class="home">
              <div class="icon"></div>
            </span>
            <span class="segment">
              <p>Noss</p>
            </span>
            <Icon :icon="'chevron_right'" :hover="false" />
            <span class="segment">
              <p>Design</p>
            </span>
            <Icon :icon="'chevron_right'" :hover="false" />
            <span class="segment">
              <p>Editor</p>
            </span>
          </div>
          <div
            class="buttons"
            v-bind="
              layout({
                alignItems: 'center',
                justifyContent: 'end',
                gap: '8px',
                pad: '8px',
              })
            "
          >
            <Button>Share</Button>
            <IconButton icon="comment" @click="toggleSecondary" />
            <IconButton icon="more_horiz" />
          </div>
        </div>
        <div class="editor" v-bind="layout()">
          <div class="open"></div>
          <Padding
            class="secondary"
            :style="{
              width: secondaryCollapsed ? '0px' : '320px',
              'flex-shrink': 0,
            }"
          >
            <Surface fill>
              <div class="content">
                <div
                  class="top"
                  v-bind="
                    layout({
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      pad: '8px',
                    })
                  "
                >
                  <h3 class="title" style="padding-inline: 0.5rem">Comments</h3>
                  <IconButton icon="close" @click="toggleSecondary" />
                </div>
              </div>
            </Surface>
          </Padding>
        </div>
      </main>
    </Layout>
  </ClientOnly>
</template>

<style scoped>
nav {
  transition: width 0.3s ease;
  flex-shrink: 0;

  & .workspace {
    width: 100%;
    height: 3.5rem;
    background: var(--surface);
    border-radius: 0.5rem;
  }

  & .workspace_select {
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background 0.3s ease;

    &:hover {
      background: var(--hover);
    }
  }

  & .workspace_icon {
    width: 1.5rem;
    height: 1.5rem;
    background: var(--accent);
  }
}

main {
  width: 100%;
  height: 100%;
}

main .topbar {
  height: 4rem;
  width: 100%;

  & .path {
    & .home {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.75rem;

      & .icon {
        width: 1rem;
        height: 1rem;
        border-radius: 0.2rem;
        border: 2px solid var(--accent);
      }
    }

    & .segment {
      padding: 0.3rem 0.7rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: var(--hover);
      }
    }
  }
}

main .editor {
  height: 100%;
}

main .editor .open {
  width: 100%;
}

main .editor .secondary {
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;

  & .content {
    width: calc(320px -0.5rem);
  }
}

h3.title {
  font-size: 1rem;
  font-weight: 700;
}
</style>
