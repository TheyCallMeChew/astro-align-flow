export type TransitData = {
  sun: string;
  moon: string;
  mercury: string;
};

const moodMap: Record<string, string> = {
  Aries: 'drive and courage',
  Taurus: 'stability and grounding',
  Gemini: 'curiosity and expression',
  Cancer: 'emotion and intuition',
  Leo: 'confidence and creativity',
  Virgo: 'focus and refinement',
  Libra: 'harmony and connection',
  Scorpio: 'depth and transformation',
  Sagittarius: 'exploration and optimism',
  Capricorn: 'discipline and achievement',
  Aquarius: 'innovation and detachment',
  Pisces: 'compassion and imagination'
};

export const generateAlignmentInsight = (sign: string, transits: TransitData): string => {
  const coreMood = moodMap[sign] || 'balance and awareness';
  const transitFocus = `${transits.sun} Sun and ${transits.moon} Moon`;
  return `Under the ${transitFocus}, focus on your natural themes of ${coreMood}. Let your actions reflect inner truth.`;
};

export async function getGeminiInsight(prompt: string): Promise<string> {
  // Placeholder: future integration with Gemini/DeepSeek API via Lovable Cloud
  // Example: call Gemini with user's astrology context
  return `✨ ${prompt} — listen to your intuition and stay aligned.`;
}

// Get current transit data (simplified - in production would use ephemeris API)
export const getCurrentTransits = (): TransitData => {
  // Placeholder: replace with actual ephemeris data or API call
  return {
    sun: 'Libra',
    moon: 'Capricorn',
    mercury: 'Scorpio'
  };
};
