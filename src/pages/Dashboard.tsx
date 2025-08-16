import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Star, 
  Moon, 
  Sun,
  Activity,
  Award
} from "lucide-react";

export default function Dashboard() {
  // Mock data - in real app this would come from state/API
  const stats = {
    streak: 7,
    completedToday: 2,
    totalToday: 3,
    weeklyCompletion: 85,
    energyAverage: 72
  };

  const recentReflections = [
    { date: "Today", gratitude: "Beautiful sunset during evening walk", energy: 80 },
    { date: "Yesterday", gratitude: "Meaningful conversation with a friend", energy: 70 },
    { date: "2 days ago", gratitude: "Breakthrough in project at work", energy: 90 }
  ];

  const insights = [
    "Your energy peaks on Tuesday mornings ✨",
    "Moon phases seem to influence your reflection depth 🌙",
    "Morning meditation correlates with task completion 🧘‍♀️"
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
          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-primary">{stats.streak}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-3xl font-bold text-primary">
                    {stats.completedToday}/{stats.totalToday}
                  </p>
                  <p className="text-xs text-muted-foreground">intentions</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Flow</p>
                  <p className="text-3xl font-bold text-primary">{stats.weeklyCompletion}%</p>
                  <p className="text-xs text-muted-foreground">completion</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Energy Level</p>
                  <p className="text-3xl font-bold text-primary">{stats.energyAverage}%</p>
                  <p className="text-xs text-muted-foreground">average</p>
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
              {recentReflections.map((reflection, index) => (
                <div key={index} className="p-4 rounded-lg bg-card/30 border border-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {reflection.date}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">Energy:</span>
                      <span className="text-sm font-semibold text-primary">
                        {reflection.energy}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground italic">
                    "{reflection.gratitude}"
                  </p>
                </div>
              ))}
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
        <div className="flex justify-center">
          <div className="flex gap-4">
            <Button variant="cosmic" size="lg">
              <Sun className="w-5 h-5 mr-2" />
              Morning Alignment
            </Button>
            <Button variant="cosmic-outline" size="lg">
              <Moon className="w-5 h-5 mr-2" />
              Evening Reflection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}