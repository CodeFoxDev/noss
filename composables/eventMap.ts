import { resolvePath } from 'nuxt/kit';

export interface EventAugmentations extends HTMLElementEventMap {
  input: InputEvent;
}

type EventListener<T extends keyof EventAugmentations> = (
  e: EventAugmentations[T]
) => void | any;
type NormalListener = () => void | any;

export class EventMap {
  #listeners: Array<{
    event: keyof EventAugmentations;
    callback: Function;
  }> = [];
  root: HTMLElement = document.body;
  constructor(root: HTMLElement) {
    this.root = root;
  }
  destruct() {
    for (const i of this.#listeners) {
      this.root.removeEventListener(i.event, i.callback as NormalListener);
    }
  }

  add<E extends keyof EventAugmentations>(
    event: E,
    callback: EventListener<E>
  ) {
    this.#listeners.push({ event, callback });
    this.root.addEventListener(event, callback as NormalListener);
  }
}
