import type { Gender } from 'src/types';

import { GENDER } from 'src/constants';

export const formatGenderLabel = (gender: string | null) => {
  switch (gender) {
    case GENDER.FEMALE:
      return 'Nữ';

    case GENDER.MALE:
      return 'Nam';

    case GENDER.OTHER:
      return 'Khác';

    default:
      return '--';
  }
};

export const mapGender = (type: string): Gender => {
  if (type === GENDER.FEMALE) {
    return GENDER.FEMALE;
  }
  if (type === GENDER.MALE) {
    return GENDER.MALE;
  }
  return GENDER.OTHER;
};
