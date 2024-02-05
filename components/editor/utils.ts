/**
 * @param node The actual text node inside the element
 */
export function focusTextAtChar(node: Node, index: number) {
  const r = document.createRange();
  r.setStart(node, index);
  r.setEnd(node, index);
  const s = window.getSelection();
  s?.removeAllRanges();
  s?.addRange(r);
}

export function getTextNode(block: HTMLElement) {}
