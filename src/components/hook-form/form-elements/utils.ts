import type { BaseSyntheticEvent } from 'react';

export const handleCreateOptions = (
  event: BaseSyntheticEvent | undefined,
  handler?: {
    onCreateOnly?: () => void;
    onCreateAndContinue?: () => void;
    onCreateAndReset?: () => void;
  }
) => {
  if (!handler) return;

  const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;
  const action = submitter?.value;
  console.log('🚀 ~ action:', action);

  switch (action) {
    case 'create-and-continue':
      handler.onCreateAndContinue?.();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      break;
    case 'create-and-reset':
      handler.onCreateAndReset?.();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      break;
    case 'create':
      handler.onCreateOnly?.();
      break;

    default:
      break;
  }
};
