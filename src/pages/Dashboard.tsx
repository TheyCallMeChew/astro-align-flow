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
    <div className="min-h-screen bg-gradient-nebula">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Cosmic Insights
          </h1>
          <p className="text-xl text-muted-foreground">
            Your journey through the stars
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-subtle border-muted/50 shadow-soft hover:shadow-cosmic transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-primary">{appState.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <Activity className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft hover:shadow-cosmic transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reflections</p>
                  <p className="text-3xl font-bold text-primary">{appState.reflections.length}</p>
                  <p className="text-xs text-muted-foreground">entries</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft hover:shadow-cosmic transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Energy</p>
                  <p className="text-3xl font-bold text-primary">{avgEnergy}%</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft hover:shadow-cosmic transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="text-xl font-bold text-primary">
                    {appState.lastActiveDate ? formatDate(appState.lastActiveDate) : "Never"}
                  </p>
                  <p className="text-xs text-muted-foreground">activity</p>
                </div>
                <Sun className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reflections */}
          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Recent Reflections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReflections.length > 0 ? (
                recentReflections.map((reflection, index) => (
                  <div key={index} className="p-4 rounded-lg bg-card/30 border border-muted/20 hover:bg-card/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(reflection.date)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Energy:</span>
                        <span className="text-sm font-semibold text-primary">
                          {reflection.energy}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground italic">
                      "{reflection.gratitude || "No gratitude recorded"}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Moon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No reflections yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Start your evening reflection to see insights</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cosmic Insights */}
          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Cosmic Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground">{insight}</p>
                </div>
              ))}
              
              <div className="pt-4">
                <Button variant="cosmic-outline" className="w-full">
                  <Award className="w-4 h-4 mr-2" />
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="cosmic-outline" size="lg" onClick={() => navigate('/')}>
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          <Button variant="cosmic" size="lg" onClick={() => navigate('/morning')}>
            <Sun className="w-5 h-5 mr-2" />
            Morning Alignment
          </Button>
          <Button variant="cosmic-outline" size="lg" onClick={() => navigate('/evening')}>
            <Moon className="w-5 h-5 mr-2" />
            Evening Reflection
          </Button>
        </div>
      </div>
    </div>
  );
}