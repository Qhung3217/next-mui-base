import LoadingButton from '@mui/lab/LoadingButton';

import FormCreateActions from './form-elements/form-create-actions';

type Props = {
  isEdit: boolean;
  loading?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
  customActions?: React.ReactNode;
  disabled?: boolean;
};
export default function FormActions({ isEdit, btnRef, customActions, loading, disabled }: Props) {
  if (customActions) {
    return <>{customActions}</>;
  }

  if (btnRef !== undefined) {
    return (
      <button
        ref={btnRef}
        type="submit"
        onClick={(event) => event.stopPropagation()}
        style={{ display: 'none' }}
      >
        submit
      </button>
    );
  }

  if (isEdit) {
    return (
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        size="medium"
        loading={loading}
        disabled={loading || disabled}
        fullWidth
        sx={{ ml: 'auto' }}
      >
        Lưu thay đổi
      </LoadingButton>
    );
  }

  return <FormCreateActions loading={loading} disabled={loading || disabled} />;
}
