import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-cosmic rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Welcome to AstroFlow
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personal cosmic companion for daily alignment and reflection
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Daily insights tailored to your energy and cosmic rhythms
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Track Your Journey</h3>
              <p className="text-sm text-muted-foreground">
                Build streaks, earn badges, and watch your growth unfold
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                All your data stays on your device. You're in full control.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="cosmic"
          size="lg"
          className="w-full"
          onClick={() => navigate('/onboarding/choose-path')}
        >
          Get Started
        </Button>
      </Card>
    </div>
  );
}
