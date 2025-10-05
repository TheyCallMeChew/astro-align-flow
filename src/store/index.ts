import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  onboardingDone: boolean;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
  quizResults?: Record<string, string>;
  lowEnergyMode: boolean;
  notificationsEnabled: boolean;
  middayReminderTime: string;
  eveningReminderTime: string;
  useForPersonalization: boolean;
  shareToCommunity: boolean;
}

export interface DailyTask {
  id: string;
  text: string;
  theme?: 'growth' | 'healing' | 'creativity';
  completed: boolean;
}

export interface DayEntry {
  date: string;
  morningEnergy?: 'low' | 'medium' | 'high';
  middayEnergy?: 'low' | 'medium' | 'high';
  tasks: DailyTask[];
  reflection?: string;
  synchronicities: string[];
  gratitude: string[];
  eveningCompleted: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  icon: string;
}

export interface Streaks {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

interface AppStore {
  profile: UserProfile;
  days: Record<string, DayEntry>;
  streaks: Streaks;
  badges: Badge[];
  
  setProfile: (profile: Partial<UserProfile>) => void;
  updateDayEntry: (date: string, entry: Partial<DayEntry>) => void;
  getTodayEntry: () => DayEntry;
  addTask: (task: DailyTask) => void;
  toggleTask: (taskId: string) => void;
  updateStreaks: () => void;
  addBadge: (badge: Badge) => void;
  exportData: () => string;
}

const getTodayDate = () => new Date().toISOString().split('T')[0];

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      profile: {
        onboardingDone: false,
        lowEnergyMode: false,
        notificationsEnabled: false,
        middayReminderTime: '11:30',
        eveningReminderTime: '20:30',
        useForPersonalization: true,
        shareToCommunity: false,
      },
      days: {},
      streaks: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: '',
      },
      badges: [],

      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),

      updateDayEntry: (date, entry) =>
        set((state) => ({
          days: {
            ...state.days,
            [date]: {
              ...state.days[date],
              date,
              tasks: state.days[date]?.tasks || [],
              synchronicities: state.days[date]?.synchronicities || [],
              gratitude: state.days[date]?.gratitude || [],
              eveningCompleted: state.days[date]?.eveningCompleted || false,
              ...entry,
            },
          },
        })),

      getTodayEntry: () => {
        const today = getTodayDate();
        const state = get();
        return (
          state.days[today] || {
            date: today,
            tasks: [],
            synchronicities: [],
            gratitude: [],
            eveningCompleted: false,
          }
        );
      },

      addTask: (task) => {
        const today = getTodayDate();
        set((state) => {
          const todayEntry = state.days[today] || {
            date: today,
            tasks: [],
            synchronicities: [],
            gratitude: [],
            eveningCompleted: false,
          };
          return {
            days: {
              ...state.days,
              [today]: {
                ...todayEntry,
                tasks: [...todayEntry.tasks, task],
              },
            },
          };
        });
      },

      toggleTask: (taskId) => {
        const today = getTodayDate();
        set((state) => {
          const todayEntry = state.days[today];
          if (!todayEntry) return state;
          
          return {
            days: {
              ...state.days,
              [today]: {
                ...todayEntry,
                tasks: todayEntry.tasks.map((task) =>
                  task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
                ),
              },
            },
          };
        });
      },

      updateStreaks: () => {
        set((state) => {
          const today = getTodayDate();
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split('T')[0];

          const todayEntry = state.days[today];
          if (!todayEntry?.eveningCompleted) return state;

          let newStreak = 1;
          if (state.streaks.lastActiveDate === yesterday) {
            newStreak = state.streaks.currentStreak + 1;
          } else if (state.streaks.lastActiveDate === today) {
            newStreak = state.streaks.currentStreak;
          }

          return {
            streaks: {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.streaks.longestStreak),
              lastActiveDate: today,
            },
          };
        });
      },

      addBadge: (badge) =>
        set((state) => {
          if (state.badges.some((b) => b.id === badge.id)) return state;
          return { badges: [...state.badges, badge] };
        }),

      exportData: () => {
        const state = get();
        return JSON.stringify(
          {
            profile: state.profile,
            days: state.days,
            streaks: state.streaks,
            badges: state.badges,
            exportedAt: new Date().toISOString(),
          },
          null,
          2
        );
      },
    }),
    {
      name: 'astroflow-storage',
    }
  )
);
