<script setup lang="ts">
import './blocks.css';
import type { Format } from '@/types/editor';
import {
  createBlock,
  cleanBlock,
  focusBlock,
  getActiveElement,
  getTextNodeFromBlock,
  getContentFromBlock,
  getChildFromBlock,
} from './editor';
import { focusTextAtChar } from './utils';
const placeholder = "Press '/' for commands";

const editor = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

useInput();

const onInput = (_e: HTMLElementEventMap['input']) => {
  if (!content.value) return;
  const e = _e as InputEvent;
  const t = e.target as HTMLElement | null;
  if (!t || t.getAttribute('data-content-editable-leaf') === null) return;

  for (const i of Array.from(t.children))
    if (i.tagName.toLowerCase() === 'br') t.removeChild(i);

  const blocks = Array.from(content.value.children) as HTMLElement[];

  if (e.inputType === 'insertParagraph') {
    const p = t.parentElement;
    if (!p) return;
    const i = blocks.indexOf(p);

    // insert new block
    const block = createBlock();
    content.value.insertBefore(block, content.value.children[i + 1]);
    focusBlock(block);

    // insert content
    if (t.childNodes.length > 1) {
      const carry = t.childNodes[1];
      t.removeChild(carry);
      block.children[0].appendChild(carry);
      console.log(block);
    }
  } //else console.log(e);

  // TODO: Chrome sometimes inserts content in div, and inserts new div when enter pressed, this should be fixed
  t.appendChild(document.createElement('br'));
};

// TODO: Add proper error handling instead of simply returning
const onKeydown = (e: HTMLElementEventMap['keydown']) => {
  if (!content.value) return;
  const blocks = Array.from(content.value.children) as HTMLElement[];

  if (e.key === 'Backspace') {
    const select = window.getSelection();
    if (!select) return;
    if (select.focusOffset === 0 && select.isCollapsed) {
      // Caret is at the start of the line and nothing is selected
      const active = getActiveElement();
      if (active === null) return;
      const i = blocks.indexOf(active);
      let block =
        blocks[i - 1] !== undefined
          ? getTextNodeFromBlock(blocks[i - 1])
          : null;
      if (block === null) {
        const text = document.createTextNode('');
        blocks[i - 1].children[0].innerHTML = '';
        blocks[i - 1].children[0].appendChild(text);
        blocks[i - 1].children[0].appendChild(document.createElement('br'));
        block = text;
      }

      const carry = getContentFromBlock(active);
      const carryLength = carry?.length ?? 0;
      if (carry !== '') block.data += carry;
      content.value.removeChild(active);

      setTimeout(() => {
        if (block === null) return;
        // TODO: not working when text content is empty
        focusTextAtChar(block, block.data.length - carryLength);
      }, 0);
    }
  } else if (e.key === 'Enter' && useInput().ctrlKeyDown === true) {
    const active = getActiveElement();
    console.log(active);
    if (!active) return;
    const i = blocks.indexOf(active);
    const block = createBlock();
    content.value.insertBefore(block, content.value.children[i + 1]);
    focusBlock(block);
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
          Some content here, test for selection menu<br />
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
