import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sunrise, Moon, TrendingUp, Sparkles, Heart, Brain } from 'lucide-react';
import { getMoonPhase, getMoonPhaseEmoji } from '@/lib/moonPhase';

export default function Home() {
  const navigate = useNavigate();
  const { getTodayEntry, streaks, profile } = useStore();
  const today = getTodayEntry();
  const moonPhase = getMoonPhase();

  const completedTasks = today.tasks.filter((t) => t.completed).length;
  const totalTasks = today.tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            AstroFlow
          </h1>
          <p className="text-muted-foreground">
            {getMoonPhaseEmoji(moonPhase)} {moonPhase.charAt(0).toUpperCase() + moonPhase.slice(1)} Moon
          </p>
        </div>

        {/* Today's Summary */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Today's Flow
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Energy</p>
              <p className="text-2xl font-bold">
                {today.morningEnergy ? (
                  <Badge variant="secondary" className="text-base">
                    {today.morningEnergy}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">Not set</span>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tasks</p>
              <p className="text-2xl font-bold">
                {completedTasks}/{totalTasks}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold">{streaks.currentStreak} 🔥</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Low Energy</p>
              <p className="text-2xl">
                {profile.lowEnergyMode ? '✓' : '–'}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          
          <Button
            variant="cosmic"
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/morning')}
          >
            <Sunrise className="w-5 h-5 mr-2" />
            {today.morningEnergy ? 'Review Morning' : 'Start Morning Alignment'}
          </Button>

          <Button
            variant="cosmic"
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/reflection')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Voice Reflection
          </Button>

          <Button
            variant="cosmic-outline"
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/meditation')}
          >
            <Brain className="w-5 h-5 mr-2" />
            Meditation Timer
          </Button>

          <Button
            variant="cosmic-outline"
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/evening')}
          >
            <Moon className="w-5 h-5 mr-2" />
            {today.eveningCompleted ? 'Review Evening' : 'Evening Reflection'}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="w-full h-14"
            onClick={() => navigate('/insights')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View Insights & Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
