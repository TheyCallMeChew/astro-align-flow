import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Zap, Battery } from 'lucide-react';
import { contentService } from '@/content/ContentService';
import { useToast } from '@/hooks/use-toast';

export default function Midday() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTodayEntry, updateDayEntry } = useStore();
  const today = getTodayEntry();
  
  const [middayEnergy, setMiddayEnergy] = useState<'low' | 'medium' | 'high' | undefined>(
    today.middayEnergy
  );

  const energyOptions = [
    { value: 'low' as const, label: 'Low', icon: Battery, color: 'text-blue-500' },
    { value: 'medium' as const, label: 'Medium', icon: Zap, color: 'text-yellow-500' },
    { value: 'high' as const, label: 'High', icon: Sun, color: 'text-orange-500' },
  ];

  const handleSave = () => {
    if (!middayEnergy) {
      toast({
        title: 'Please select your energy level',
        variant: 'destructive',
      });
      return;
    }

    updateDayEntry(today.date, { middayEnergy });
    toast({
      title: 'Midday check-in saved',
      description: 'Keep flowing through your day ✨',
    });
    navigate('/home');
  };

  const nudge = middayEnergy ? contentService.getNudge(middayEnergy) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Midday Check-In</h1>
          <p className="text-muted-foreground">How's your energy right now?</p>
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Current Energy Level</h2>
            <div className="grid grid-cols-3 gap-3">
              {energyOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={middayEnergy === option.value ? 'cosmic' : 'outline'}
                    className="h-24 flex flex-col gap-2"
                    onClick={() => setMiddayEnergy(option.value)}
                  >
                    <Icon className={`w-8 h-8 ${middayEnergy === option.value ? 'text-primary-foreground' : option.color}`} />
                    <span>{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {nudge && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-primary mb-1">Insight for you:</p>
              <p className="text-foreground">{nudge}</p>
            </div>
          )}
        </Card>

        <div className="space-y-3">
          <Button
            variant="cosmic"
            size="lg"
            className="w-full"
            onClick={handleSave}
          >
            Save Check-In
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
