'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
  backHref: string;
};
export function RecordNotFoundView({ backHref }: Props) {
  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center', alignContent: 'center' }}>
      <m.div variants={varBounce('in')}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Dữ liệu không tìm thấy!
        </Typography>
      </m.div>

      <m.div variants={varBounce('in')}>
        <Typography sx={{ color: 'text.secondary' }}>
          Dữ liệu bạn truy cập không tồn tại. Vui lòng kiểm tra lại đường dẫn.
        </Typography>
      </m.div>

      <m.div variants={varBounce('in')}>
        <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button
        component={RouterLink}
        href={backHref}
        size="large"
        variant="contained"
        sx={{ maxWidth: 320, width: 1 }}
      >
        Trở về trang danh sách
      </Button>
    </Container>
  );
}
