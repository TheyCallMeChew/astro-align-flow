import { Preferences } from '@capacitor/preferences';

export async function get<T>(key: string, fallback: T): Promise<T> {
  const r = await Preferences.get({ key });
  return r.value ? JSON.parse(r.value) as T : fallback;
}

export async function set<T>(key: string, value: T) {
  await Preferences.set({ key, value: JSON.stringify(value) });
}

// app keys
export const KEYS = {
  profile: 'af_profile',
  day: (iso: string) => `af_day_${iso}`,
  reflections: 'af_reflections',
  synchros: 'af_synchros',
  rituals: 'af_rituals',
  settings: 'af_settings',
};
