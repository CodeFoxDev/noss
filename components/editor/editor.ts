import type { Format, Type } from '@/types/editor';

export function createBlock() {
  const div = document.createElement('div');
  div.className = 'noss-selectable noss-text-block';
  const text = document.createElement('p');
  text.setAttribute('contenteditable', 'true');
  text.setAttribute('data-content-editable-leaf', 'true');
  text.setAttribute('tabindex', '0');
  div.appendChild(text);
  return div;
}

export function cleanBlock(block: HTMLElement) {
  block.childNodes.forEach((e) => {
    if (e.nodeType === 1) {
      const _e = e as HTMLElement;
      if (_e.tagName.toLowerCase() === 'br') block.removeChild(_e);
    }
  });
}

export function getChildFromBlock(block: HTMLElement) {
  const child = block.querySelector(
    '[data-content-editable-leaf]'
  ) as HTMLElement | null;
  return child;
}

export function focusBlock(block: HTMLElement) {
  const child = block.querySelector(
    '[data-content-editable-leaf]'
  ) as HTMLElement | null;
  if (!child) return;
  child.focus();
}

export function focusBlockAtChar(block: HTMLElement, index: number) {
  const child = getChildFromBlock(block);
  const editable = child?.childNodes[0];
  if (!child || !editable) return;
  const r = document.createRange();
  r.setStart(editable, index);
  const s = window.getSelection();
  s?.removeAllRanges();
  s?.addRange(r);
}

export function getActiveElement(): HTMLElement | null {
  const active = document.activeElement;
  if (!active) return null;
  if (active.getAttribute('data-content-editable-leaf') !== null)
    return active.parentElement;
  else if (active.classList.contains('noss-selectable'))
    return active as HTMLElement;
  return null;
}

export function getTextNodeFromBlock(block: HTMLElement): Text | null {
  const child = block.querySelector(
    '[data-content-editable-leaf]'
  ) as HTMLElement;
  if (!child) return null;
  if (child.children[0] === child.childNodes[0]) return null;
  return child.childNodes[0] as Text;
}

export function getContentFromBlock(block: HTMLElement): string {
  return getTextNodeFromBlock(block)?.data ?? '';
}
