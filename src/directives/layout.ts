import type { CSSProperties } from 'vue';

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

export function layout(props: Props) {
  const direction = props.direction === 'horizontal' ? 'row' : 'column';

  return {
    display: 'flex',
    'flex-direction': direction,
    'align-items': props.alignItems,
    'justify-content': props.justifyContent,
    gap: props.gap,
    padding: props.pad,
  };
}
