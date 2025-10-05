import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { get, set, KEYS } from '@/storage/local';
import type { Ritual } from '@/types';

export default function RitualTimer() {
  const [minutes, setMinutes] = useState(7);
  const [sec, setSec] = useState(minutes * 60);
  const [run, setRun] = useState(false);

  useEffect(() => setSec(minutes * 60), [minutes]);

  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => {
      setSec((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRun(false);
          handleComplete();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [run]);

  const handleComplete = async () => {
    const rituals = await get<Ritual[]>(KEYS.rituals, []);
    rituals.push({
      id: String(Date.now()),
      ts: Date.now(),
      minutes,
      completed: true,
    });
    await set(KEYS.rituals, rituals);
  };

  const mm = Math.floor(sec / 60);
  const ss = String(sec % 60).padStart(2, '0');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            Ritual Timer
          </h1>
          <p className="text-muted-foreground">
            Sacred time for meditation & reflection
          </p>
        </div>

        <Card className="p-8 space-y-6 border-primary/20 hover:border-primary/30 transition-all">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-7xl font-bold text-primary tabular-nums">
                {mm}:{ss}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={run ? 'outline' : 'cosmic'}
                size="icon"
                className="w-16 h-16 rounded-full"
                onClick={() => setRun(true)}
                disabled={run}
              >
                <Play className="w-8 h-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full"
                onClick={() => setRun(false)}
                disabled={!run}
              >
                <Pause className="w-8 h-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full"
                onClick={() => {
                  setRun(false);
                  setSec(minutes * 60);
                }}
              >
                <RotateCcw className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-center">Duration Presets</h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[3, 7, 11, 22].map((m) => (
              <Button
                key={m}
                variant={minutes === m ? 'cosmic' : 'outline'}
                onClick={() => setMinutes(m)}
                disabled={run}
              >
                {m} min
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-muted/30">
          <h3 className="font-semibold mb-3">Sacred Numbers</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 3 min: Quick reset & breath work</li>
            <li>• 7 min: Chakra alignment & grounding</li>
            <li>• 11 min: Deep meditation & clarity</li>
            <li>• 22 min: Master number manifestation</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
