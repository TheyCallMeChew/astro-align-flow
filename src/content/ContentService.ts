import contentData from './content.json';
import { getMoonPhase, type MoonPhase } from '@/lib/moonPhase';

interface ContentTags {
  energy?: 'low' | 'medium' | 'high';
  phase?: MoonPhase;
}

interface ContentItem {
  text: string;
  tags: ContentTags;
}

class ContentService {
  private quotes: ContentItem[] = contentData.quotes as ContentItem[];
  private nudges: ContentItem[] = contentData.nudges as ContentItem[];
  private reflectionPrompts: string[] = contentData.reflectionPrompts;

  getQuote(filters: ContentTags = {}): string {
    const currentPhase = getMoonPhase();
    const matches = this.quotes.filter((quote) => {
      if (filters.energy && quote.tags.energy !== filters.energy) return false;
      if (filters.phase && quote.tags.phase !== filters.phase) return false;
      return true;
    });

    // Fallback to phase-only matching if no exact match
    const phaseMatches = this.quotes.filter(
      (quote) => quote.tags.phase === (filters.phase || currentPhase)
    );

    const pool = matches.length > 0 ? matches : phaseMatches.length > 0 ? phaseMatches : this.quotes;
    return pool[Math.floor(Math.random() * pool.length)].text;
  }

  getNudge(energy?: 'low' | 'medium' | 'high'): string {
    const matches = energy
      ? this.nudges.filter((nudge) => nudge.tags.energy === energy)
      : this.nudges;
    
    const pool = matches.length > 0 ? matches : this.nudges;
    return pool[Math.floor(Math.random() * pool.length)].text;
  }

  getReflectionPrompt(): string {
    return this.reflectionPrompts[
      Math.floor(Math.random() * this.reflectionPrompts.length)
    ];
  }
}

export const contentService = new ContentService();
