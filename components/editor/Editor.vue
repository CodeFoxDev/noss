<script setup lang="ts">
import './blocks.css';
import type { Format } from '@/types/editor';
import {
  createBlock,
  cleanBlock,
  focusBlock,
  getActiveElement,
  getContentFromBlock,
  getChildFromBlock,
} from './editor';
const placeholder = "Press '/' for commands";

const editor = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

const onInput = (_e: HTMLElementEventMap['input']) => {
  if (!content.value) return;
  const e = _e as InputEvent;
  const t = e.target as HTMLElement | null;
  if (!t || t.getAttribute('data-content-editable-leaf') === null) return;

  // sometimes if no <br> are present, there is a non functional character, you can move over it with arrows, but deleting it results in previous character being removed
  cleanBlock(t);
  const blocks = Array.from(content.value.children) as HTMLElement[];

  if (e.inputType === 'insertParagraph') {
    _e.preventDefault();
    const p = t.parentElement;
    if (!p) return;
    const i = blocks.indexOf(p);

    // insert new block
    const block = createBlock();
    content.value.insertBefore(block, content.value.children[i + 1]);
    focusBlock(block);
    // TODO: Insert content into next block if enter was not at the end
  } else console.log(e);

  // TODO: Chrome sometimes inserts content in div, and inserts new div when enter pressed, this should be fixed
};

// TODO: Add proper error handling instead of simply returning
const onKeydown = (e: HTMLElementEventMap['keydown']) => {
  if (!content.value) return;
  if (e.key === 'Backspace') {
    const select = window.getSelection();
    if (!select) return;
    const offset = select.focusOffset;
    if (offset === 0) {
      // move this block's content to prev block
      const active = getActiveElement();
      if (active === null) return;
      const blocks = Array.from(content.value.children) as HTMLElement[];
      const newIndex = blocks.indexOf(active) - 1;
      const editable = getChildFromBlock(blocks[newIndex]);
      if (newIndex === -1 || !editable) return;
      cleanBlock(editable);
      const focusIndex = getContentFromBlock(blocks[newIndex])?.length;
      const carry = getContentFromBlock(active);
      if (!focusIndex || !carry) return;
      // Insert this content in previous block, along with temporary char that gets removed when focus changes
      editable.innerText += '_' + carry;
      content.value.removeChild(active);
      // Set focus on correct index
      const r = document.createRange();
      r.setStart(editable.childNodes[0], focusIndex);
      r.setEnd(editable.childNodes[0], focusIndex + 1);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
    }
  }
};

onMounted(() => {
  editor.value?.addEventListener('input', onInput);
  editor.value?.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  editor.value?.removeEventListener('input', onInput);
  editor.value?.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div class="editor" ref="editor">
    <div class="layout-header"></div>
    <div
      class="layout-content"
      ref="content"
      style="width: 100%; height: 200px"
    >
      <div class="noss-selectable noss-header-block">
        <h1 contenteditable data-content-editable-leaf>
          Some content here, test for selection menu
        </h1>
      </div>
    </div>
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
