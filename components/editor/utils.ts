/**
 * Should be wrapped in a timeout of 0 if element has just been changed, otherwise a character might be removed
 * @param node The actual text node inside the element
 */
export function focusTextAtChar(node: Node, index: number) {
  const range = document.createRange();
  const sel = window.getSelection();
  if (!sel) return;
  range.setStart(node, index);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}
