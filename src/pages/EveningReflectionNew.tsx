import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Moon, Heart, Sparkles, Plus, X, CheckCircle2 } from 'lucide-react';
import { contentService } from '@/content/ContentService';
import { useToast } from '@/hooks/use-toast';

export default function EveningReflectionNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTodayEntry, updateDayEntry, toggleTask, updateStreaks, addBadge } = useStore();
  const today = getTodayEntry();

  const [reflection, setReflection] = useState(today.reflection || '');
  const [synchronicities, setSynchronicities] = useState<string[]>(today.synchronicities || []);
  const [gratitude, setGratitude] = useState<string[]>(today.gratitude || []);
  const [newSync, setNewSync] = useState('');
  const [newGratitude, setNewGratitude] = useState('');

  const reflectionPrompt = contentService.getReflectionPrompt();
  const completedCount = today.tasks.filter((t) => t.completed).length;

  const handleAddSync = () => {
    if (newSync.trim() && synchronicities.length < 5) {
      setSynchronicities([...synchronicities, newSync.trim()]);
      setNewSync('');
    }
  };

  const handleAddGratitude = () => {
    if (newGratitude.trim() && gratitude.length < 5) {
      setGratitude([...gratitude, newGratitude.trim()]);
      setNewGratitude('');
    }
  };

  const handleComplete = () => {
    updateDayEntry(today.date, {
      reflection,
      synchronicities,
      gratitude,
      eveningCompleted: true,
    });

    updateStreaks();

    // Check for badge eligibility
    const { streaks } = useStore.getState();
    if (streaks.currentStreak === 3) {
      addBadge({
        id: 'first_streak',
        name: '3-Day Streak',
        description: 'Completed 3 consecutive reflections',
        earnedAt: new Date().toISOString(),
        icon: '🔥',
      });
    }
    if (streaks.currentStreak === 7) {
      addBadge({
        id: 'week_warrior',
        name: 'Week Warrior',
        description: '7-day reflection streak',
        earnedAt: new Date().toISOString(),
        icon: '⭐',
      });
    }

    toast({
      title: 'Evening reflection saved 🌙',
      description: 'Rest well and dream cosmic dreams',
    });

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Moon className="w-8 h-8 text-primary" />
            Evening Reflection
          </h1>
          <p className="text-muted-foreground">Honor your day with gratitude</p>
        </div>

        {/* Task Review */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Today's Tasks</h2>
            <Badge variant="secondary" className="ml-auto">
              {completedCount}/{today.tasks.length}
            </Badge>
          </div>

          <div className="space-y-2">
            {today.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tasks set for today
              </p>
            ) : (
              today.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => toggleTask(task.id)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-gradient-cosmic border-primary'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <span
                    className={`flex-1 ${
                      task.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Gratitude */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Gratitude</h2>
            <Badge variant="secondary" className="ml-auto">
              {gratitude.length}/5
            </Badge>
          </div>

          <div className="space-y-2">
            {gratitude.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border"
              >
                <span className="text-primary mt-0.5">•</span>
                <span className="flex-1">{item}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setGratitude(gratitude.filter((_, i) => i !== index))}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}

            {gratitude.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="I'm grateful for..."
                  value={newGratitude}
                  onChange={(e) => setNewGratitude(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGratitude()}
                />
                <Button onClick={handleAddGratitude} size="icon" variant="cosmic">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Synchronicities */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Synchronicities</h2>
            <Badge variant="secondary" className="ml-auto">
              {synchronicities.length}/5
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            What meaningful moments or cosmic nudges did you notice?
          </p>

          <div className="space-y-2">
            {synchronicities.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border"
              >
                <span className="text-primary mt-0.5">✨</span>
                <span className="flex-1">{item}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() =>
                    setSynchronicities(synchronicities.filter((_, i) => i !== index))
                  }
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}

            {synchronicities.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="A synchronicity I noticed..."
                  value={newSync}
                  onChange={(e) => setNewSync(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSync()}
                />
                <Button onClick={handleAddSync} size="icon" variant="cosmic">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Reflection */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Daily Reflection</h2>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm italic text-foreground">"{reflectionPrompt}"</p>
          </div>
          <Textarea
            placeholder="Reflect on your day's journey..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="min-h-[120px]"
          />
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="cosmic"
            size="lg"
            className="w-full"
            onClick={handleComplete}
          >
            <Moon className="w-5 h-5 mr-2" />
            Complete Evening Reflection
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
