import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Sparkles, Moon, Sun, Star, Heart, Target, ChevronRight } from "lucide-react";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import cosmicHero from "@/assets/cosmic-hero.jpg";

export default function MobileHome() {
  const navigate = useNavigate();

  const handleNavigation = async (path: string) => {
    await Haptics.impact({ style: ImpactStyle.Medium });
    navigate(path);
  };

  const quickActions = [
    {
      icon: Sun,
      title: "Morning Alignment",
      description: "Start your cosmic day",
      path: "/morning",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: Moon,
      title: "Evening Reflection",
      description: "Close with gratitude",
      path: "/evening",
      gradient: "from-blue-500/20 to-purple-500/20"
    }
  ];

  const features = [
    { icon: Star, title: "Cosmic Insights", color: "text-purple-400" },
    { icon: Target, title: "Daily Intentions", color: "text-green-400" },
    { icon: Heart, title: "Mindful Practices", color: "text-pink-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-nebula pb-20">
      {/* Hero Header */}
      <header className="relative h-72 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary mb-4">
            ✨ Your Cosmic Companion
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-3">
            AstroFlow
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            Align your daily rhythm with cosmic wisdom
          </p>
        </div>
      </header>

      <div className="px-4 -mt-8 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.path}
                className="bg-gradient-subtle border-muted/50 shadow-cosmic overflow-hidden"
                onClick={() => handleNavigation(action.path)}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${action.gradient} p-6 flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-cosmic flex items-center justify-center shadow-glow">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-foreground">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="pt-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Daily Tools</h2>
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="bg-gradient-subtle border-muted/50">
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
                    <p className="text-xs text-muted-foreground">{feature.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="bg-gradient-cosmic border-0 shadow-glow">
          <CardContent className="p-6 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-white mx-auto" />
            <h3 className="text-lg font-semibold text-white">Welcome to Your Journey</h3>
            <p className="text-white/90 text-sm">
              Transform ordinary days into extraordinary journeys of growth and cosmic alignment
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
