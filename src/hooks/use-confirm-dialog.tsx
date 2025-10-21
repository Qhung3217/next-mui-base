'use client';

import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import type { ConfirmDialogProps } from 'src/components/custom-dialog/types';

import React, { useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import LoadingButton from '@mui/lab/LoadingButton';

import { ConfirmDialog } from 'src/components/custom-dialog';

interface ConfirmDialogOptions<T> {
  title?: (props: T) => React.ReactNode;
  content?: (props: T) => React.ReactNode;
  confirmText?: (props: T) => React.ReactNode;
  slotProps?: Pick<ConfirmDialogProps, 'slotProps'> & {
    action?: (props: T) => Omit<LoadingButtonProps, 'children'>;
  };
}
export default function useConfirmDialog<T>(callback: (props: T) => any) {
  const [callbackProps, setCallbackProps] = useState<T | null>(null);
  const confirming = useBoolean();

  const open = useBoolean();

  const openConfirm = (props: T) => {
    open.onTrue();
    setCallbackProps(props);
  };

  const handleConfirm = async () => {
    if (callbackProps === null) return;

    confirming.onTrue();

    callback(callbackProps).finally(() => {
      handleClose();
    });
  };

  const handleClose = () => {
    confirming.onFalse();
    open.onFalse();
    setCallbackProps(null);
  };

  const renderConfirmDialog = ({
    title: titleFn,
    content: contentFn,
    confirmText: confirmTextFn,
    ...props
  }: ConfirmDialogOptions<T> &
    Omit<ConfirmDialogProps, 'open' | 'onClose' | 'title' | 'content' | 'action'> = {}) => {
    if (!open.value || callbackProps === null) return null;

    // Gọi các hàm options với callbackProps
    const title = titleFn ? titleFn(callbackProps) : 'Thực hiện thao tác?';
    const content = contentFn ? (
      contentFn(callbackProps)
    ) : (
      <>Bạn xác nhận thực hiện thao tác này?</>
    );
    const confirmText = confirmTextFn ? confirmTextFn(callbackProps) : 'Xác nhận';

    return (
      <ConfirmDialog
        open={open.value}
        onClose={handleClose}
        closeAfterTransition
        title={title}
        content={content}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={confirming.value}
            onClick={handleConfirm}
            {...props?.slotProps?.action?.(callbackProps)}
          >
            {confirmText}
          </LoadingButton>
        }
        {...props}
      />
    );
  };

  return [openConfirm, renderConfirmDialog] as const;
}
