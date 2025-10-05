import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

export default function Insights() {
  const { days, streaks, badges } = useStore();

  const energyData = Object.values(days)
    .filter((day) => day.morningEnergy)
    .slice(-14)
    .map((day) => ({
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      energy: day.morningEnergy === 'high' ? 3 : day.morningEnergy === 'medium' ? 2 : 1,
    }));

  const completionData = Object.values(days)
    .slice(-14)
    .map((day) => ({
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: day.tasks.filter((t) => t.completed).length,
      total: day.tasks.length,
    }));

  const totalReflections = Object.values(days).filter((d) => d.eveningCompleted).length;
  const avgEnergy =
    energyData.reduce((sum, d) => sum + d.energy, 0) / (energyData.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your Insights</h1>
          <p className="text-muted-foreground">Track your growth and patterns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Current Streak</span>
            </div>
            <p className="text-3xl font-bold">{streaks.currentStreak}</p>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs">Reflections</span>
            </div>
            <p className="text-3xl font-bold">{totalReflections}</p>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Avg Energy</span>
            </div>
            <p className="text-3xl font-bold">{avgEnergy.toFixed(1)}</p>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span className="text-xs">Badges</span>
            </div>
            <p className="text-3xl font-bold">{badges.length}</p>
          </Card>
        </div>

        {/* Energy Trend */}
        {energyData.length > 0 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Energy Trend (Last 14 Days)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis
                  ticks={[1, 2, 3]}
                  tickFormatter={(value) =>
                    value === 3 ? 'High' : value === 2 ? 'Med' : 'Low'
                  }
                  className="text-xs"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Task Completion */}
        {completionData.length > 0 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Task Completion</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" />
              Earned Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-lg border border-border bg-card space-y-2 text-center"
                >
                  <div className="text-4xl">{badge.icon}</div>
                  <h3 className="font-semibold">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {badges.length === 0 && (
          <Card className="p-8 text-center space-y-2">
            <Award className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">No badges yet</h3>
            <p className="text-muted-foreground">
              Complete 3 consecutive reflections to earn your first badge!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
