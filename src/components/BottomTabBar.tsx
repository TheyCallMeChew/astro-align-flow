import { NavLink } from 'react-router-dom';
import { Home, Sunrise, Moon, Heart, BarChart3 } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/morning', icon: Sunrise, label: 'Morning' },
  { path: '/reflection', icon: Heart, label: 'Reflect' },
  { path: '/meditation', icon: Moon, label: 'Meditate' },
  { path: '/insights', icon: BarChart3, label: 'Insights' },
];

export function BottomTabBar() {
  const handleTap = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border pb-safe z-50">
      <div className="flex items-center justify-around h-16 max-w-screen-sm mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              onClick={handleTap}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-10 h-1 bg-gradient-cosmic rounded-t-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
