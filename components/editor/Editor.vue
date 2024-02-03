<script setup lang="ts">
const blocks = ref<HTMLDivElement>();

const onInput = (_e: HTMLElementEventMap['input']) => {
  const e = _e as InputEvent;
  if (e.inputType === 'insertParagraph') {
    console.log(e);
    e.preventDefault();
  }
};

onMounted(() => blocks.value?.addEventListener('input', onInput));
onUnmounted(() => blocks.value?.removeEventListener('input', onInput));
</script>

<template>
  <div class="editor">
    <div class="header"></div>
    <div
      class="content"
      ref="blocks"
      style="width: 100%; height: 200px; background: white; outline: none"
      placeholder="Press '/' for commands"
      contenteditable="true"
    >
      <div>Some content here, test for selection menu</div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  width: 700px;
}
h3.title {
  font-size: 1rem;
  font-weight: 700;
}
</style>
