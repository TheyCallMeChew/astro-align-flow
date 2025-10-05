import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Heart } from 'lucide-react';
import { meditationTimer } from '@/services/meditationTimer';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import type { TimerState } from '@/services/meditationTimer';

export default function Meditation() {
  const [timerState, setTimerState] = useState<TimerState>({
    duration: 5,
    remaining: 300,
    isRunning: false,
    isPaused: false,
  });
  const [tempDuration, setTempDuration] = useState(5);

  useEffect(() => {
    meditationTimer.initialize().then(() => {
      const state = meditationTimer.getState();
      setTimerState(state);
      setTempDuration(state.duration);
    });

    const unsubscribe = meditationTimer.subscribe((state) => {
      setTimerState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStart = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    }
    meditationTimer.start();
  };

  const handlePause = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
    meditationTimer.pause();
  };

  const handleResume = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    }
    meditationTimer.resume();
  };

  const handleReset = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }
    meditationTimer.reset();
  };

  const handleDurationChange = async (value: number[]) => {
    const newDuration = value[0];
    setTempDuration(newDuration);
    
    if (!timerState.isRunning) {
      await meditationTimer.saveDuration(newDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timerState.remaining / (timerState.duration * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            Meditation
          </h1>
          <p className="text-muted-foreground">
            Find your center and breathe
          </p>
        </div>

        {/* Timer Display */}
        <Card className="p-8 space-y-6">
          <div className="flex flex-col items-center gap-6">
            {/* Circular Timer */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Progress Ring */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                  className="text-primary transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>

              {/* Time Display */}
              <div className="text-center">
                <div className="text-5xl font-bold tabular-nums">
                  {formatTime(timerState.remaining)}
                </div>
                <Badge variant="secondary" className="mt-2">
                  {timerState.duration} min session
                </Badge>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {!timerState.isRunning ? (
                <Button
                  variant="cosmic"
                  size="lg"
                  className="w-24 h-24 rounded-full"
                  onClick={handleStart}
                >
                  <Play className="w-10 h-10" />
                </Button>
              ) : timerState.isPaused ? (
                <Button
                  variant="cosmic"
                  size="lg"
                  className="w-24 h-24 rounded-full"
                  onClick={handleResume}
                >
                  <Play className="w-10 h-10" />
                </Button>
              ) : (
                <Button
                  variant="cosmic-outline"
                  size="lg"
                  className="w-24 h-24 rounded-full"
                  onClick={handlePause}
                >
                  <Pause className="w-10 h-10" />
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full"
                onClick={handleReset}
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            {/* Status Text */}
            <p className="text-center text-sm text-muted-foreground">
              {timerState.isRunning
                ? timerState.isPaused
                  ? 'Paused - tap play to resume'
                  : 'Meditation in progress...'
                : 'Ready to begin'}
            </p>
          </div>
        </Card>

        {/* Duration Selector */}
        {!timerState.isRunning && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Session Duration</h3>
              <Badge variant="secondary" className="text-lg px-3">
                {tempDuration} min
              </Badge>
            </div>

            <Slider
              value={[tempDuration]}
              onValueChange={handleDurationChange}
              min={1}
              max={60}
              step={1}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 min</span>
              <span>60 min</span>
            </div>
          </Card>
        )}

        {/* Meditation Guide */}
        {!timerState.isRunning && (
          <Card className="p-6 space-y-4 bg-gradient-subtle">
            <h3 className="font-semibold">Simple Breathing Guide</h3>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-card/50">
                <p className="font-medium mb-1">🌙 Low Energy</p>
                <p className="text-muted-foreground">
                  Inhale for 4, hold for 2, exhale for 6. Let your body rest and restore.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-card/50">
                <p className="font-medium mb-1">⚡ Balanced Energy</p>
                <p className="text-muted-foreground">
                  Box breathing: Inhale 4, hold 4, exhale 4, hold 4. Find your center.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-card/50">
                <p className="font-medium mb-1">☀️ High Energy</p>
                <p className="text-muted-foreground">
                  Quick inhales through nose, strong exhales. Channel this power wisely.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Completion Message */}
        {timerState.remaining === 0 && !timerState.isRunning && (
          <Card className="p-6 text-center space-y-3 bg-primary/10 border-primary/30">
            <div className="text-4xl">✨</div>
            <h3 className="text-lg font-semibold">Meditation Complete</h3>
            <p className="text-muted-foreground">
              You've completed your {timerState.duration}-minute session.
              Take a moment to notice how you feel.
            </p>
            <Button variant="cosmic" onClick={handleReset}>
              Start Another Session
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
