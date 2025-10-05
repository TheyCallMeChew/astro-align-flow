import type { Synchro } from '../types';

export function analyzeSynchronicities(items: Synchro[]) {
  if (!items.length) return { bestHour: undefined, topNumber: undefined };
  
  const byHour = new Array(24).fill(0);
  const numbers: Record<string, number> = {};
  
  for (const s of items) {
    const h = new Date(s.ts).getHours();
    byHour[h]++;
    if (s.numberSeen) numbers[s.numberSeen] = (numbers[s.numberSeen] || 0) + 1;
  }
  
  const bestHour = byHour.indexOf(Math.max(...byHour));
  const topNumber = Object.entries(numbers).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  return { bestHour, topNumber };
}
