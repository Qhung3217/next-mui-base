'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useCounterStore } from '../../stores';

export default function CounterScreen() {
  const { count, inc } = useCounterStore();

  return (
    <Container
      sx={{
        width: 'fit-content',
        minHeight: '90dvh',
        alignContent: 'center',
      }}
    >
      <Typography variant="h6">{count}</Typography>
      <Button onClick={inc} variant="contained">
        one up
      </Button>
    </Container>
  );
}
