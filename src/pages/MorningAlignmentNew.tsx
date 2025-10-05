import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sunrise, Sparkles, Heart, Plus, X } from 'lucide-react';
import { contentService } from '@/content/ContentService';
import { useToast } from '@/hooks/use-toast';
import { getMoonPhase } from '@/lib/moonPhase';

export default function MorningAlignmentNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTodayEntry, updateDayEntry, addTask } = useStore();
  const today = getTodayEntry();

  const [energy, setEnergy] = useState<'low' | 'medium' | 'high' | undefined>(
    today.morningEnergy
  );
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(today.tasks);

  const quote = energy
    ? contentService.getQuote({ energy, phase: getMoonPhase() })
    : contentService.getQuote({ phase: getMoonPhase() });

  const energyOptions = [
    { value: 'low' as const, label: 'Low', emoji: '🌙', desc: 'Gentle & restorative' },
    { value: 'medium' as const, label: 'Medium', emoji: '⚡', desc: 'Balanced & steady' },
    { value: 'high' as const, label: 'High', emoji: '☀️', desc: 'Vibrant & dynamic' },
  ];

  const handleAddTask = () => {
    if (!newTask.trim() || tasks.length >= 3) return;

    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleComplete = () => {
    if (!energy) {
      toast({ title: 'Please set your energy level', variant: 'destructive' });
      return;
    }

    updateDayEntry(today.date, {
      morningEnergy: energy,
      tasks,
    });

    toast({
      title: 'Morning alignment complete ✨',
      description: 'Your intentions are set for the day',
    });

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-8">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sunrise className="w-8 h-8 text-primary animate-pulse" />
            Morning Alignment
          </h1>
          <p className="text-muted-foreground text-lg">Set your intentions for the day</p>
        </div>

        {/* Energy Check */}
        <Card className="p-6 space-y-4 border-primary/20 hover:border-primary/30 transition-all animate-fade-in">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">How's your energy?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This helps personalize your guidance
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {energyOptions.map((option) => (
              <Button
                key={option.value}
                variant={energy === option.value ? 'cosmic' : 'outline'}
                className="h-auto py-4 px-2 flex flex-col gap-1 items-center justify-center"
                onClick={() => setEnergy(option.value)}
              >
                <span className="text-2xl mb-1">{option.emoji}</span>
                <span className="font-semibold text-sm">{option.label}</span>
                <span className="text-xs opacity-80 text-center leading-tight">
                  {option.desc}
                </span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Daily Quote */}
        <Card className="p-6 space-y-3 bg-gradient-subtle border-primary/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Today's Cosmic Message</h2>
          </div>
          <blockquote className="text-foreground italic border-l-4 border-primary pl-4">
            "{quote}"
          </blockquote>
        </Card>

        {/* Daily Intentions */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Daily Intentions</h2>
            <Badge variant="secondary" className="ml-auto">
              {tasks.length}/3
            </Badge>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border"
              >
                <span className="flex-1">{task.text}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {tasks.length < 3 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add an intention for today..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  className="flex-1"
                />
                <Button
                  onClick={handleAddTask}
                  size="icon"
                  variant="cosmic"
                  disabled={!newTask.trim()}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            💡 Focus on 1-3 meaningful intentions rather than a long list
          </p>
        </Card>

        {/* Meditation Prompt */}
        {energy && (
          <Card className="p-6 space-y-3 bg-primary/5">
            <h3 className="font-semibold">Suggested Practice (2-3 min)</h3>
            <p className="text-sm text-muted-foreground">
              {energy === 'low' &&
                'Gentle breathing: Inhale for 4, hold for 2, exhale for 6. Let your body rest and restore.'}
              {energy === 'medium' &&
                'Box breathing: Inhale 4, hold 4, exhale 4, hold 4. Find your center and balance.'}
              {energy === 'high' &&
                'Energizing breath: Quick inhales through nose, strong exhales. Channel this power wisely.'}
            </p>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="cosmic"
            size="lg"
            className="w-full"
            onClick={handleComplete}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Complete Morning Alignment
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
