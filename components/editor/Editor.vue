<script setup lang="ts">
import './blocks.css';
import { Editor } from './editor';
import { Block } from './block';
const placeholder = "Press '/' for commands";

let editorClass: Editor;

const editor = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

onMounted(() => {
  if (editor.value === undefined) return;
  editorClass = new Editor(editor.value);
  // Test data
  const block = new Block();
  editorClass.insert(block);
  block.format = 'h1';
  block.content = 'Some content here, test for selection menu';
});
onUnmounted(() => {
  editorClass?.destruct();
});
</script>

<template>
  <div class="editor" ref="editor">
    <div class="layout-header"></div>
    <div
      class="layout-content"
      ref="content"
      style="width: 100%; height: 200px"
    ></div>
  </div>
</template>

<style scoped>
.editor {
  width: 700px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div {
    padding: 0.25rem;
    border-radius: 0.25rem;
    background: rgba(255, 255, 255, 0.2);
    overflow-wrap: break-word;
    word-wrap: break-word;

    &::placeholder {
      color: red;
    }
    &[data-selected] {
      background: var(--accent-dim);
    }
  }
}
</style>
