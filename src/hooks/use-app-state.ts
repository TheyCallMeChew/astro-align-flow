import { useLocalStorage } from './use-local-storage';

export interface DailyReflection {
  date: string;
  gratitude: string;
  synchronicities: string;
  reflection: string;
  energy: number;
  completedTasks: string[];
}

export interface AppState {
  reflections: DailyReflection[];
  currentStreak: number;
  lastActiveDate: string;
}

const initialState: AppState = {
  reflections: [],
  currentStreak: 0,
  lastActiveDate: ''
};

export function useAppState() {
  const [appState, setAppState] = useLocalStorage<AppState>('astroflow-state', initialState);

  const addReflection = (reflection: DailyReflection) => {
    setAppState((prev) => {
      const newReflections = [reflection, ...prev.reflections].slice(0, 30); // Keep last 30 days
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const newStreak = prev.lastActiveDate === yesterday 
        ? prev.currentStreak + 1 
        : prev.lastActiveDate === today 
        ? prev.currentStreak 
        : 1;

      return {
        reflections: newReflections,
        currentStreak: newStreak,
        lastActiveDate: today
      };
    });
  };

  const getRecentReflections = (count: number = 5) => {
    return appState.reflections.slice(0, count);
  };

  const getTodayReflection = () => {
    const today = new Date().toISOString().split('T')[0];
    return appState.reflections.find(r => r.date === today);
  };

  return {
    appState,
    addReflection,
    getRecentReflections,
    getTodayReflection
  };
}
