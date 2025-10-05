import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store';
import { Shield, Lock, Database } from 'lucide-react';
import { useState } from 'react';

export default function Privacy() {
  const navigate = useNavigate();
  const { setProfile } = useStore();
  const [useForPersonalization, setUseForPersonalization] = useState(true);
  const [shareToCommunity, setShareToCommunity] = useState(false);

  const handleComplete = () => {
    setProfile({
      useForPersonalization,
      shareToCommunity,
      onboardingDone: true,
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Privacy & Preferences</h1>
          <p className="text-muted-foreground">
            You're in control of your data
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/50 space-y-3">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Local Storage Only</h3>
                <p className="text-xs text-muted-foreground">
                  All your data stays on your device. Nothing is sent to servers.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Database className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Full Control</h3>
                <p className="text-xs text-muted-foreground">
                  Export or delete your data anytime in Settings.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Use for Personalization</Label>
                <p className="text-sm text-muted-foreground">
                  Enable personalized insights based on your profile
                </p>
              </div>
              <Switch
                checked={useForPersonalization}
                onCheckedChange={setUseForPersonalization}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share to Community (Anonymous)</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve the experience (off by default)
                </p>
              </div>
              <Switch
                checked={shareToCommunity}
                onCheckedChange={setShareToCommunity}
              />
            </div>
          </div>
        </div>

        <Button
          variant="cosmic"
          size="lg"
          className="w-full"
          onClick={handleComplete}
        >
          Complete Setup & Start
        </Button>
      </Card>
    </div>
  );
}
