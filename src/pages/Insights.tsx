import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, TrendingUp, CheckCircle2, Zap, Sparkles, Moon, Calendar } from 'lucide-react';
import insightsData from '@/data/insights.json';
import { generateAlignmentInsight, getCurrentTransits } from '@/utils/AstroAlignmentEngine';
import { getDailyInsight, getWeeklyInsight } from '@/engine/insightsLocal';
import type { Energy } from '@/types';
import { get, KEYS } from '@/storage/local';

export default function Insights() {
  const { days, streaks, badges, profile } = useStore();
  const [dailyInsight, setDailyInsight] = useState('');
  const [weeklyInsight, setWeeklyInsight] = useState('');
  const [alignmentInsight, setAlignmentInsight] = useState('');
  const [recentEnergy, setRecentEnergy] = useState<Energy>('medium');
  const [localDailyInsight, setLocalDailyInsight] = useState({ title: '', body: '', recs: [] as string[] });
  const [localWeeklyInsight, setLocalWeeklyInsight] = useState({ title: '', body: '', focusDays: [] as string[] });

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

  // Load astrology insights
  useEffect(() => {
    (async () => {
      const today = new Date().toISOString().split('T')[0];
      const dayData = await get(KEYS.day(today), { date: today, tasks: [], energy: 'medium' as Energy });
      if (dayData.energy) setRecentEnergy(dayData.energy);
    })();
    
    const userSign = (profile.sunSign || 'libra').toLowerCase() as keyof typeof insightsData;
    const signInsights = insightsData[userSign] || insightsData.libra;
    const sunSign = profile.sunSign || 'Libra';
    
    setDailyInsight(signInsights.today);
    setWeeklyInsight(signInsights.week);

    const transits = getCurrentTransits();
    const alignment = generateAlignmentInsight(sunSign, transits);
    setAlignmentInsight(alignment);
    
    // Get local engine insights
    const daily = getDailyInsight(sunSign, recentEnergy);
    const weekly = getWeeklyInsight(sunSign);
    setLocalDailyInsight(daily);
    setLocalWeeklyInsight(weekly);
  }, [profile.sunSign, recentEnergy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            Cosmic Insights
          </h1>
          <p className="text-muted-foreground">Your astrology and personal growth journey</p>
        </div>

        {/* Astrology Insights Section */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-cosmic animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">{localDailyInsight.title || "Today's Energy"}</h2>
            </div>
            <p className="text-foreground leading-relaxed">{localDailyInsight.body || dailyInsight}</p>
            {localDailyInsight.recs && localDailyInsight.recs.length > 0 && (
              <div className="space-y-2 mt-4 pt-4 border-t border-primary/10">
                {localDailyInsight.recs.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 via-accent/5 to-background border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-glow animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">{localWeeklyInsight.title || "Weekly Focus"}</h2>
            </div>
            <p className="text-foreground leading-relaxed">{localWeeklyInsight.body || weeklyInsight}</p>
            {localWeeklyInsight.focusDays && localWeeklyInsight.focusDays.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Focus days:</span>
                {localWeeklyInsight.focusDays.map((day) => (
                  <Badge key={day} variant="secondary">
                    {day}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 via-secondary/5 to-background border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-soft animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-semibold">Alignment Insight</h2>
            </div>
            <p className="text-foreground leading-relaxed">{alignmentInsight}</p>
          </Card>
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
