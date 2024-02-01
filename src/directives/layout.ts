import type { CSSProperties, HTMLAttributes, StyleValue, Directive } from 'vue';

export interface Props {
  direction?: 'horizontal' | 'vertical';
  alignItems?: CSSProperties['align-items'];
  justifyContent?: CSSProperties['justify-content'];
  gap?: string;
  pad?: string;
}

export const defaults: Props = {
  alignItems: 'initial',
  justifyContent: 'initial',
  direction: 'horizontal',
  gap: '0',
  pad: '0',
};

export function layout(props?: Props): HTMLAttributes {
  props ??= {};
  props.direction ??= defaults.direction;
  const direction = props.direction === 'horizontal' ? 'row' : 'column';

  return {
    style: {
      display: 'flex',
      'flex-direction': direction,
      'align-items': props.alignItems ?? defaults.alignItems,
      'justify-content': props.justifyContent ?? defaults.justifyContent,
      gap: props.gap ?? defaults.gap,
      padding: props.pad ?? defaults.pad,
    },
  };
}
