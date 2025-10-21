import { CONFIG } from 'src/global-config';

export const withServerUrl = (src: string | undefined | null) => {
  if (!src) return undefined;
  const isExternal = src.startsWith('http') || src.startsWith('blob');

  return !isExternal ? `${CONFIG.serverUrl}/${src}` : src;
};
