import type { Type, Format } from '@/types/editor';

export class Block {
  type: Type = 'text';

  element: HTMLDivElement;
  span: HTMLSpanElement;

  lastFocus: number = 0;
  /** Can be undefined if content is empty string */
  #textElement?: Text;
  #format: Format = 'text';
  #content: string = '';

  constructor() {
    const { div, span, text } = createBlock();
    this.element = div;
    this.span = span;
    this.#textElement = text;
  }

  /**
   * Sets the caret at the character with index `char`
   * @param index The character index where to focus, leave empty for the end, and set to -1 for last position
   */
  focus(index?: number) {
    if (index === undefined || index > this.#content.length)
      index = this.content.length;
    else if (index === -1) index = this.lastFocus;
    console.log(index, this.lastFocus);

    if (!this.#textElement) this.#textElement = this.#createTextElement();

    const range = document.createRange();
    const sel = window.getSelection();
    if (!sel) return;

    range.setStart(this.#textElement, index);
    this.lastFocus = index;
    range.collapse(true);

    sel.removeAllRanges();
    setFocus(() => sel.addRange(range));
  }

  get format(): Format {
    return this.#format;
  }

  /**
   * The content of the block, can be set to update DOM.
   * This is only used if the `type` is set to `text`
   */
  get content(): string {
    if (this.#textElement) this.#content = this.#textElement.data;
    else if (this.span.childNodes.length > 1) {
      this.#textElement = this.span.childNodes[0] as Text;
      this.#content = this.#textElement.data;
    }
    return this.#content;
  }

  set format(format: Format) {
    this.element.classList.remove(getClassFromFormat(this.#format));
    this.#format = format;
    this.element.classList.add(getClassFromFormat(this.#format));
  }

  set content(str: string) {
    this.#content = str;
    if (this.#textElement) this.#textElement.data = str;
    else this.#createTextElement(str);
  }

  #createTextElement(str?: string): Text {
    str ??= '';
    this.#textElement = document.createTextNode(str);
    this.element.children[0].innerHTML = '';
    this.element.children[0].appendChild(this.#textElement);
    this.element.children[0].appendChild(document.createElement('br'));
    return this.#textElement;
  }
}

function createBlock() {
  const div = document.createElement('div');
  div.className = 'noss-selectable noss-text-block';
  const span = document.createElement('p');
  span.setAttribute('contenteditable', 'true');
  span.setAttribute('data-content-editable-leaf', 'true');
  const text = document.createTextNode('');
  span.appendChild(text);
  div.appendChild(span);
  return { div, span, text };
}

function getClassFromFormat(format: Format): string {
  if (format === 'h1') return 'noss-header-block';
  else if (format === 'h2') return 'noss-sub_header-block';
  else if (format === 'h3') return 'noss-sub_sub_header-block';
  else return `noss-${format}-block`;
}

export function setFocus(cb: () => void) {
  setTimeout(() => cb(), 20);
}
