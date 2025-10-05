export type Energy = 'low' | 'medium' | 'high';

export interface Profile {
  id: string;
  name?: string;
  sunSign?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
  onboardingDone: boolean;
}

export interface DailyTask {
  id: string;
  title: string;
  done: boolean;
  theme?: string;
}

export interface DayEntry {
  date: string; // YYYY-MM-DD
  energy?: Energy;
  tasks: DailyTask[];
  note?: string;
}

export interface Reflection {
  id: string;
  ts: number;
  type: 'audio' | 'text';
  audioPath?: string;
  text?: string;
  durationSec?: number;
  sentiment?: number;
}

export interface Synchro {
  id: string;
  ts: number;
  note?: string;
  tag?: string;
  numberSeen?: string;
}

export interface Ritual {
  id: string;
  ts: number;
  minutes: number;
  completed: boolean;
}

export interface Settings {
  meditationMinutes: number;
  lunarMode: boolean;
  trialStartTs?: number;
  premium?: boolean;
}
