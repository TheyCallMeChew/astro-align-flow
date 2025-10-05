import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Hash, Clock } from 'lucide-react';
import { get, set, KEYS } from '@/storage/local';
import { analyzeSynchronicities } from '@/engine/synchronicity';
import type { Synchro } from '@/types';

export default function SynchronicityLog() {
  const [note, setNote] = useState('');
  const [num, setNum] = useState('');
  const [items, setItems] = useState<Synchro[]>([]);

  useEffect(() => {
    (async () => setItems(await get(KEYS.synchros, [])))();
  }, []);

  const add = async () => {
    if (!note.trim()) return;
    
    const s: Synchro = {
      id: String(Date.now()),
      ts: Date.now(),
      note,
      numberSeen: num || undefined,
    };
    const list = [s, ...items];
    setItems(list);
    await set(KEYS.synchros, list);
    setNote('');
    setNum('');
  };

  const { bestHour, topNumber } = analyzeSynchronicities(items);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            Synchronicities
          </h1>
          <p className="text-muted-foreground">
            Track meaningful patterns & cosmic signals
          </p>
        </div>

        <Card className="p-6 space-y-4 border-primary/20">
          <div className="space-y-3">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What happened? What did you notice?"
              className="min-h-[100px]"
            />
            <Input
              value={num}
              onChange={(e) => setNum(e.target.value)}
              placeholder="Number seen? (e.g., 222, 111)"
            />
            <Button variant="cosmic" size="lg" className="w-full" onClick={add}>
              <Sparkles className="w-5 h-5 mr-2" />
              Add Synchronicity
            </Button>
          </div>
        </Card>

        {items.length > 0 && (
          <>
            <Card className="p-6 bg-gradient-subtle border-primary/30">
              <h3 className="font-semibold text-primary mb-4">Patterns Detected</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    Peak hour: {bestHour !== undefined ? `${bestHour}:00` : 'Not enough data'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    Lucky number: {topNumber || 'Not enough data'}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {new Date(item.ts).toLocaleDateString()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.ts).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground">{item.note}</p>
                    {item.numberSeen && (
                      <Badge variant="outline" className="gap-1">
                        <Hash className="w-3 h-3" />
                        {item.numberSeen}
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {items.length === 0 && (
          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">What are synchronicities?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Meaningful coincidences that catch your attention</li>
              <li>• Repeating numbers (111, 222, 333, etc.)</li>
              <li>• Unexpected encounters or messages</li>
              <li>• Dreams that come true</li>
              <li>• Perfect timing or "meant to be" moments</li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
