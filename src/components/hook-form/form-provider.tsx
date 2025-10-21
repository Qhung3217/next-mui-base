import type { SxProps } from '@mui/material/styles';
import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  sx?: SxProps;
  formProps?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLFormElement>) => void;
    id?: string;
  };
  isChildForm?: boolean;
};

export function Form({ children, onSubmit, methods, sx, formProps, isChildForm }: FormProps) {
  return (
    <RHFForm {...methods}>
      <Box
        component="form"
        sx={{
          display: 'inherit',
          flexDirection: 'inherit',
          flex: '1 1 auto',
          overflowY: 'auto',
          '&  input, & .MuiInputBase-multiline': {
            py: 0.5,
            px: 1,
          },
          '& .MuiPickersInputBase-root': {
            px: 1,
          },
          '& .MuiPickersSectionList-root': {
            py: 0.5,
          },

          '& .MuiSelect-select': {
            py: 0.5,
            pl: 1,
          },
          ...sx,
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (isChildForm) {
            event.stopPropagation();
          }
          (onSubmit as any)?.(event as any);
        }}
        noValidate
        autoComplete="off"
        {...formProps}
      >
        {children}
      </Box>
    </RHFForm>
  );
}
