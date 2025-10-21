import type { SettingsState } from './types';

import { defaultSettings } from './settings-config';

// ----------------------------------------------------------------------

export async function detectSettings(): Promise<SettingsState> {
  return defaultSettings;
}
