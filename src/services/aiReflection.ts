import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';

export interface TranscriptionResult {
  transcript: string;
  summary: string;
  affirmation: string;
}

class AIReflectionService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey?: string, apiUrl?: string) {
    this.apiKey = apiKey || DEEPSEEK_API_KEY;
    this.apiUrl = apiUrl || DEEPSEEK_API_URL;
  }

  /**
   * Transcribe audio using DeepSeek or fallback to browser Web Speech API
   */
  async transcribeAudio(audioBase64: string): Promise<string> {
    // For now, we'll use a placeholder transcription
    // In production, you would integrate with Whisper API or DeepSeek's audio endpoint
    console.log('Transcribing audio...');
    
    // Fallback: Use Web Speech API if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      return this.transcribeWithWebSpeech(audioBase64);
    }

    // TODO: Implement actual API call to Whisper or DeepSeek audio endpoint
    return 'Transcription placeholder - integrate with Whisper API or DeepSeek audio endpoint';
  }

  /**
   * Use browser's Web Speech API for transcription (fallback)
   */
  private async transcribeWithWebSpeech(audioBase64: string): Promise<string> {
    return new Promise((resolve) => {
      // This is a placeholder - actual implementation would need audio playback
      // for the Web Speech API to work
      resolve('Web Speech API transcription placeholder');
    });
  }

  /**
   * Generate compassionate summary and affirmation using DeepSeek
   */
  async generateInsights(transcript: string): Promise<TranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not configured. Please add VITE_DEEPSEEK_API_KEY to your environment.');
    }

    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a compassionate AI reflection assistant. Your role is to:
1. Create a warm, empathetic summary (2-3 sentences) of the user's reflection
2. Generate one short, personalized affirmation based on their themes and emotions
Be supportive, non-judgmental, and encouraging. Focus on growth and self-compassion.`
            },
            {
              role: 'user',
              content: `Please analyze this reflection and provide:
1. A compassionate summary (2-3 sentences)
2. One personalized affirmation

Reflection:
${transcript}

Format your response as JSON:
{
  "summary": "your summary here",
  "affirmation": "your affirmation here"
}`
            }
          ],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      
      // Try to parse JSON response
      try {
        const parsed = JSON.parse(content);
        return {
          transcript,
          summary: parsed.summary || 'No summary generated',
          affirmation: parsed.affirmation || 'You are worthy of compassion and growth',
        };
      } catch {
        // Fallback if not JSON
        return {
          transcript,
          summary: content.split('\n')[0] || 'Your reflection has been recorded',
          affirmation: 'I honor my journey and trust the process',
        };
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      
      // Graceful fallback
      return {
        transcript,
        summary: 'Your reflection captures an important moment in your journey. Thank you for sharing.',
        affirmation: 'I am growing and learning with each reflection',
      };
    }
  }

  /**
   * Complete flow: transcribe + generate insights
   */
  async processReflection(audioBase64: string): Promise<TranscriptionResult> {
    const transcript = await this.transcribeAudio(audioBase64);
    return await this.generateInsights(transcript);
  }

  /**
   * Speak affirmation using Web Speech API
   */
  async speakAffirmation(text: string): Promise<void> {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const aiReflectionService = new AIReflectionService();
