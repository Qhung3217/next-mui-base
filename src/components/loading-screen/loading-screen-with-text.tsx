import { Modal, Stack, Typography } from '@mui/material';

import { AnimateLogoZoom } from '../../components/animate';

type Props = {
  loading: boolean;
  text: string;
};
export default function LoadingScreenWithText({ loading, text }: Props) {
  return (
    <Modal open={loading} sx={{ zIndex: 99999 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <AnimateLogoZoom sx={{ minHeight: 'unset' }} />
        <Typography sx={{ color: 'white', fontWeight: 800, mt: 1 }}>{text}</Typography>
      </Stack>
    </Modal>
  );
}
