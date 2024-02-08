import './drag.css';
import type { Ref } from 'vue';

// TODO: only start custom select if mouse is not over the block it is selecting
export class Drag {
  root: HTMLElement;

  #mouseX = ref(0);
  #initialMouseX = ref(0);
  #mouseY = ref(0);
  #initialMouseY = ref(0);
  #mouseDown = ref(false);

  #element: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.#element = createDragElement();

    document.addEventListener('mousemove', this.#onMousemove.bind(this));
    document.addEventListener('mousedown', this.#onMousedown.bind(this));
    document.addEventListener('mouseup', this.#onMouseup.bind(this));

    watchEffect(() => {
      document.body.setAttribute('data-drag', this.#mouseDown.value.toString());
      this.#element.style.opacity = this.#mouseDown.value ? '1' : '0';
      this.#element.style.left = `${this.#initialMouseX.value}px`;
      this.#element.style.top = `${this.#initialMouseY.value}px`;
    });

    watchEffect(() => {
      if (!this.#mouseDown.value) return;
      let left = this.#initialMouseX.value; // 500
      let width = this.#mouseX.value - this.#initialMouseX.value; // 300 - 500 = -200
      if (width < 0) {
        left = this.#initialMouseX.value + width;
        width = this.#initialMouseX.value - this.#mouseX.value;
      }

      this.#element.style.left = `${left}px`;
      this.#element.style.width = `${width}px`;
    });

    watchEffect(() => {
      if (!this.#mouseDown.value) return;
      let right = this.#initialMouseY.value; // 500
      let height = this.#mouseY.value - this.#initialMouseY.value; // 300 - 500 = -200
      if (height < 0) {
        right = this.#initialMouseY.value + height;
        height = this.#initialMouseY.value - this.#mouseY.value;
      }

      this.#element.style.top = `${right}px`;
      this.#element.style.height = `${height}px`;
    });
  }
  destruct() {
    document.removeEventListener('mousemove', this.#onMousemove.bind(this));
    document.removeEventListener('mousedown', this.#onMousedown.bind(this));
    document.removeEventListener('mouseup', this.#onMouseup.bind(this));

    document.body.removeChild(this.#element);
  }

  #onMousemove(e: MouseEvent) {
    this.#mouseX.value = e.clientX;
    this.#mouseY.value = e.clientY;
  }

  #onMousedown(e: MouseEvent) {
    this.#mouseDown.value = true;
    this.#initialMouseX.value = e.clientX;
    this.#initialMouseY.value = e.clientY;
  }

  #onMouseup(e: MouseEvent) {
    this.#mouseDown.value = false;
    this.#initialMouseX.value = 0;
    this.#initialMouseY.value = 0;
  }
}

function createDragElement() {
  const div = document.createElement('div');
  div.setAttribute('class', 'drag');
  document.body.appendChild(div);
  return div;
}
