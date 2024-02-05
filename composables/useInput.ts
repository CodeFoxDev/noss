export interface UseInputData {
  shiftKeyDown: boolean;
  altKeyDown: boolean;
  ctrlKeyDown: boolean;
}

const data: UseInputData = {
  shiftKeyDown: false,
  altKeyDown: false,
  ctrlKeyDown: false,
};

export default function () {
  return data;
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Shift') data.shiftKeyDown = true;
  else if (e.key === 'Alt') data.altKeyDown = true;
  else if (e.key === 'Control') data.ctrlKeyDown = true;
};

const onKeyup = (e: KeyboardEvent) => {
  if (e.key === 'Shift') data.shiftKeyDown = false;
  else if (e.key === 'Alt') data.altKeyDown = false;
  else if (e.key === 'Control') data.ctrlKeyDown = false;
};

document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);
