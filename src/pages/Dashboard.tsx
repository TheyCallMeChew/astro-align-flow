import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/hooks/use-app-state";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Star, 
  Moon, 
  Sun,
  Activity,
  Award,
  Home
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { appState, getRecentReflections } = useAppState();
  
  const recentReflections = getRecentReflections(3);
  const avgEnergy = recentReflections.length > 0
    ? Math.round(recentReflections.reduce((sum, r) => sum + r.energy, 0) / recentReflections.length)
    : 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";
    
    const daysAgo = Math.floor((Date.now() - date.getTime()) / 86400000);
    return `${daysAgo} days ago`;
  };

  const insights = [
    recentReflections.length > 0 
      ? `You've reflected ${recentReflections.length} times recently ✨`
      : "Start your first reflection tonight 🌙",
    appState.currentStreak > 0 
      ? `${appState.currentStreak} day streak - keep it going! 🔥`
      : "Begin your cosmic journey today 🚀",
    avgEnergy > 0 
      ? `Average energy: ${avgEnergy}% - ${avgEnergy > 70 ? "High flow!" : "Finding balance"} ⚡`
      : "Track your energy to see patterns 📊"
  ];

  return (
    <div className="min-h-screen bg-gradient-nebula pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Mobile Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Cosmic Insights
          </h1>
          <p className="text-sm text-muted-foreground">
            Your journey through the stars
          </p>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{appState.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{appState.reflections.length}</p>
                  <p className="text-xs text-muted-foreground">Reflections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{avgEnergy}%</p>
                  <p className="text-xs text-muted-foreground">Avg Energy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <Sun className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-bold text-primary">
                    {appState.lastActiveDate ? formatDate(appState.lastActiveDate) : "Never"}
                  </p>
                  <p className="text-xs text-muted-foreground">Last Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reflections - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Moon className="w-4 h-4 text-primary" />
              Recent Reflections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReflections.length > 0 ? (
              recentReflections.map((reflection, index) => (
                <div key={index} className="p-3 rounded-lg bg-card/30 border border-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {formatDate(reflection.date)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Energy:</span>
                      <span className="text-xs font-semibold text-primary">
                        {reflection.energy}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground italic line-clamp-2">
                    "{reflection.gratitude || "No gratitude recorded"}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <Moon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">No reflections yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start your evening reflection</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cosmic Insights - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-4 h-4 text-primary" />
              Cosmic Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-foreground">{insight}</p>
              </div>
            ))}
            
            <Button variant="cosmic-outline" className="w-full mt-3" size="sm">
              <Award className="w-3.5 h-3.5 mr-2" />
              View Detailed Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}