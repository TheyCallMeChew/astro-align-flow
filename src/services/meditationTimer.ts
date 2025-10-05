import { Preferences } from '@capacitor/preferences';

const MEDITATION_DURATION_KEY = 'meditation_duration';
const DEFAULT_DURATION = 5; // 5 minutes

export interface TimerState {
  duration: number; // in minutes
  remaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
}

class MeditationTimerService {
  private intervalId: number | null = null;
  private callbacks: ((state: TimerState) => void)[] = [];
  private state: TimerState = {
    duration: DEFAULT_DURATION,
    remaining: DEFAULT_DURATION * 60,
    isRunning: false,
    isPaused: false,
  };

  async initialize() {
    const savedDuration = await this.getSavedDuration();
    this.state.duration = savedDuration;
    this.state.remaining = savedDuration * 60;
  }

  subscribe(callback: (state: TimerState) => void) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  private notifySubscribers() {
    this.callbacks.forEach((callback) => callback({ ...this.state }));
  }

  async getSavedDuration(): Promise<number> {
    try {
      const { value } = await Preferences.get({ key: MEDITATION_DURATION_KEY });
      return value ? parseInt(value, 10) : DEFAULT_DURATION;
    } catch (error) {
      console.error('Error getting saved duration:', error);
      return DEFAULT_DURATION;
    }
  }

  async saveDuration(minutes: number) {
    try {
      await Preferences.set({
        key: MEDITATION_DURATION_KEY,
        value: minutes.toString(),
      });
      this.state.duration = minutes;
      if (!this.state.isRunning) {
        this.state.remaining = minutes * 60;
      }
      this.notifySubscribers();
    } catch (error) {
      console.error('Error saving duration:', error);
    }
  }

  start() {
    if (this.state.isRunning && !this.state.isPaused) return;

    if (!this.state.isPaused) {
      this.state.remaining = this.state.duration * 60;
    }

    this.state.isRunning = true;
    this.state.isPaused = false;

    this.intervalId = window.setInterval(() => {
      if (this.state.remaining > 0) {
        this.state.remaining -= 1;
        this.notifySubscribers();
      } else {
        this.complete();
      }
    }, 1000);

    this.notifySubscribers();
  }

  pause() {
    if (!this.state.isRunning) return;

    this.state.isPaused = true;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notifySubscribers();
  }

  resume() {
    if (!this.state.isPaused) return;
    this.state.isPaused = false;
    this.start();
  }

  reset() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.state.remaining = this.state.duration * 60;
    this.state.isRunning = false;
    this.state.isPaused = false;
    this.notifySubscribers();
  }

  private complete() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.state.isRunning = false;
    this.state.isPaused = false;
    this.notifySubscribers();

    // Optional: Play completion sound or haptic feedback
    console.log('Meditation complete!');
  }

  getState(): TimerState {
    return { ...this.state };
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

export const meditationTimer = new MeditationTimerService();
