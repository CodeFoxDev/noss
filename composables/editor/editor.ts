import type { EventAugmentations } from '../eventMap';
import { Block, setFocus } from './block';
import { EventMap } from '../eventMap';
import { Drag } from './services/drag';

/**
 * TODO:
 * - Implement load function to load existing page
 */
export class Editor {
  root: HTMLElement;
  content: HTMLElement;
  blocks: Block[] = [];

  listeners: EventMap;

  constructor(editorRef: HTMLElement) {
    this.root = editorRef;
    this.content = this.root.children[1] as HTMLElement;
    this.listeners = new EventMap(this.root);

    this.listeners.add('input', this.#onInput.bind(this));
    this.listeners.add('keydown', this.#onKeydown.bind(this));
  }

  /**
   * Removes all event listeners
   */
  destruct() {
    this.listeners.destruct();
  }

  insert(block: Block, index?: number) {
    if (typeof index === 'number') {
      this.content.insertBefore(block.element, this.content.children[index]);
      this.blocks.splice(index, 0, block);
    } else {
      this.content.appendChild(block.element);
      this.blocks.push(block);
    }
  }

  remove(block: Block) {
    if (!this.blocks.includes(block)) return;
    this.content.removeChild(block.element);
    this.blocks.splice(this.blocks.indexOf(block), 1);
  }

  /* Helper functions */

  activeBlock(): Block | null;
  activeBlock(index: boolean): number;
  activeBlock(index?: boolean): Block | number | null {
    const ret = index === true ? -1 : null;
    const ele = document.activeElement;
    if (!ele || ele.tagName === 'BODY') return ret;
    let block: HTMLElement;
    if (ele.getAttribute('data-content-editable-leaf') !== null)
      block = ele.parentElement as HTMLElement;
    else if (ele.classList.contains('noss-selectable'))
      block = ele as HTMLElement;
    else return ret;

    const found = this.blocks.find((e) => e.element === block);
    if (!found) return ret;
    if (index === true) return this.blocks.indexOf(found);
    return found;
  }

  /* Event listeners */

  #onInput(e: EventAugmentations['input']) {
    const t = e.target as HTMLElement | null;
    if (!t || t.getAttribute('data-content-editable-leaf') === null) return;

    for (const i of Array.from(t.children))
      if (i.tagName.toLowerCase() === 'br') t.removeChild(i);

    if (e.inputType === 'insertParagraph') {
      const select = window.getSelection();
      const active = this.activeBlock();
      if (active === null) return;
      const i = this.blocks.indexOf(active);
      if (i === -1) return;

      const block = new Block();
      this.insert(block, i + 1);

      if (select && select.focusOffset === 0 && select.isCollapsed) {
        if (active.content !== '') {
          block.content = active.content;
          active.content = '';
        }
      } else if (t.childNodes.length > 1) {
        const carry = t.childNodes[1];
        t.removeChild(carry);
        block.content = (carry as Text).data;
      }

      block.focus(0);
    }

    t.appendChild(document.createElement('br'));
  }

  #onKeydown(e: EventAugmentations['keydown']) {
    const select = window.getSelection();
    if (!select) return;
    (() => {
      if (e.key === 'Backspace') {
        if (select.focusOffset === 0 && select.isCollapsed) {
          const active = this.activeBlock();
          if (!active) return;
          const i = this.blocks.indexOf(active);
          if (i === 0) return;

          const block = this.blocks[i - 1];
          const carry = active.content;
          const focusIndex = block.content.length;
          if (carry !== '') block.content = block.content + carry;
          this.remove(active);

          setFocus(() => block.focus(focusIndex));
        }
      } else if (e.key === 'Enter' && e.ctrlKey === true) {
        const i = this.activeBlock(true);
        const block = new Block();
        this.insert(block, i + 1);
        setFocus(() => block.focus());
      }
      // Maybe calculate offset, so cursor stays roughly at same x coord,
      // instead of character length base, which causes it to jump
      else if (e.key === 'ArrowUp') {
        const i = this.activeBlock(true);
        const block = this.blocks[i - 1];
        const offset = select.focusOffset;
        if (block !== undefined) block.focus(offset);
      } else if (e.key === 'ArrowDown') {
        const i = this.activeBlock(true);
        const block = this.blocks[i + 1];
        const offset = select.focusOffset;
        if (block !== undefined) block.focus(offset);
      }
      // Left should go to end of previous line
      else if (
        e.key === 'ArrowLeft' &&
        select.focusOffset === 0 &&
        select.isCollapsed
      ) {
        const i = this.activeBlock(true);
        if (i === 0) return;
        setFocus(() => this.blocks[i - 1].focus());
      }
      // Right should go to start of new line
      else if (e.key === 'ArrowRight' && select.isCollapsed) {
        const i = this.activeBlock(true);
        if (i === -1) return;
        if (this.blocks[i].content.length !== select.focusOffset) return;
        if (this.blocks[i + 1]) setFocus(() => this.blocks[i + 1].focus(0));
      }
    })();
  }

  // Selecting
  #selecting = ref(false);

  #onMousemove(e: EventAugmentations['mousemove']) {}

  #onMousedown(e: EventAugmentations['mousedown']) {
    const active = this.activeBlock();
    if (active !== null) return;
    this.#selecting.value = true;
  }

  #onMouseup(e: EventAugmentations['mouseup']) {}
}
