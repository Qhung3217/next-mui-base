'use client';

import type { ThemeOptions } from './types';

import { createPaletteChannel } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export const themeOverrides: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#c9d1f5',
          light: '#94a2ea',
          main: '#4c64dc',
          dark: '#35469a',
          darker: '#172c7a',
          contrastText: '#FFFFFF',
        }),
      },
    },
    dark: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#c9d1f5',
          light: '#94a2ea',
          main: '#4c64dc',
          dark: '#35469a',
          darker: '#172c7a',
          contrastText: '#FFFFFF',
        }),
      },
    },
  },
};
