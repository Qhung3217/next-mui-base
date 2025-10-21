import type { Gender } from 'src/types';

export const GENDER: { [K in Gender]: K } = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export const GENDER_ARRAY: Gender[] = Object.values(GENDER);
