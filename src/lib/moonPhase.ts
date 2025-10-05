export type MoonPhase = 'new' | 'waxing' | 'full' | 'waning';

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    const year2 = year - 1;
    const month2 = month + 12;
    c = year2;
    e = month2;
  } else {
    c = year;
    e = month;
  }

  jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5;
  b = (jd - 2451550.1) / 29.530588853;
  const phase = (b - Math.floor(b)) * 29.530588853;

  if (phase < 1.84566) return 'new';
  if (phase < 7.38264) return 'waxing';
  if (phase < 14.76528) return 'full';
  if (phase < 22.14792) return 'waning';
  return 'new';
}

export function getMoonPhaseEmoji(phase: MoonPhase): string {
  const emojis = {
    new: '🌑',
    waxing: '🌒',
    full: '🌕',
    waning: '🌘',
  };
  return emojis[phase];
}
