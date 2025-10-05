import type { Energy } from '../types';
import { getMoonPhaseDetails } from '../lib/moonPhase';

const signThemes: Record<string, string[]> = {
  Aries: ['bold starts', 'movement', 'direct talk'],
  Taurus: ['stability', 'comfort', 'crafted work'],
  Gemini: ['curiosity', 'writing', 'social check-ins'],
  Cancer: ['nurture', 'home rituals', 'rest'],
  Leo: ['creative shine', 'play', 'sharing'],
  Virgo: ['refinement', 'health', 'service'],
  Libra: ['harmony', 'collab', 'beauty'],
  Scorpio: ['depth', 'truth', 'transformation'],
  Sagittarius: ['explore', 'learn', 'big picture'],
  Capricorn: ['structure', 'achievement', 'discipline'],
  Aquarius: ['innovation', 'community', 'ideas'],
  Pisces: ['compassion', 'dreamwork', 'imagination'],
};

export function getDailyInsight(sunSign = 'Libra', recentEnergy: Energy = 'medium') {
  const { name: moon } = getMoonPhaseDetails();
  const themes = signThemes[sunSign] ?? ['balance', 'clarity', 'care'];
  
  const base = moon.includes('New')
    ? 'seed intentions'
    : moon.includes('First Quarter')
    ? 'take a clean step'
    : moon.includes('Full')
    ? 'harvest & share'
    : moon.includes('Last Quarter')
    ? 'reflect & release'
    : moon.startsWith('Waxing')
    ? 'build momentum'
    : 'restore gently';
  
  const tone =
    recentEnergy === 'low'
      ? 'choose gentler tasks'
      : recentEnergy === 'high'
      ? 'lean into courageous work'
      : 'pace yourself with one focused block';

  return {
    title: `Today • ${moon}`,
    body: `As a ${sunSign}, favor ${themes[0]} — ${base}. Also, ${tone}.`,
    recs: [
      `Micro-action: 15 minutes on ${themes[1]}.`,
      `Ritual: 3-minute breath + ${moon.includes('Full') ? 'gratitude list' : 'one-line intention'}.`,
    ],
  };
}

export function getWeeklyInsight(sunSign = 'Libra') {
  const themes = signThemes[sunSign] ?? ['alignment', 'clarity', 'focus'];
  return {
    title: 'This Week in Flow',
    body: `Center on ${themes[0]} and protect time for ${themes[1]}. Track one small win daily.`,
    focusDays: ['Tue', 'Thu'],
  };
}
