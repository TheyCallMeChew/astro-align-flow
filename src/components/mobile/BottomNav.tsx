import { useNavigate, useLocation } from "react-router-dom";
import { Home, Sunrise, Moon, LayoutDashboard } from "lucide-react";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Sunrise, label: "Morning", path: "/morning" },
    { icon: Moon, label: "Evening", path: "/evening" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" }
  ];

  const handleNavigation = async (path: string) => {
    await Haptics.impact({ style: ImpactStyle.Light });
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-muted/50 pb-safe z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all duration-200 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-gradient-cosmic rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
