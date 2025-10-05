import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store';
import { Shield } from 'lucide-react';

export default function BirthInfo() {
  const navigate = useNavigate();
  const { setProfile } = useStore();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');

  const handleContinue = () => {
    setProfile({
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthLocation: birthLocation || undefined,
    });
    navigate('/onboarding/privacy');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Birth Information</h1>
          <p className="text-muted-foreground">
            This helps us provide personalized cosmic insights
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="birthDate">Birth Date *</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="birthTime">Birth Time (optional)</Label>
            <Input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              placeholder="HH:MM"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Time helps provide more accurate insights
            </p>
          </div>

          <div>
            <Label htmlFor="birthLocation">Birth Location (optional)</Label>
            <Input
              id="birthLocation"
              placeholder="City, Country"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
            />
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Privacy Promise</p>
              <p className="text-xs text-muted-foreground">
                Your birth information is stored locally on your device only. We never
                send it to any server. You can delete it anytime in Settings.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="cosmic"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={!birthDate}
          >
            Continue
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/onboarding/privacy')}
          >
            Skip this step
          </Button>
        </div>
      </Card>
    </div>
  );
}
