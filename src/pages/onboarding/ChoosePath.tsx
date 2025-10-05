import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, HelpCircle } from 'lucide-react';

export default function ChoosePath() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Let's Personalize Your Experience</h1>
          <p className="text-muted-foreground">
            Choose how you'd like to get started
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="cosmic"
            size="lg"
            className="w-full h-auto py-6 flex flex-col gap-2"
            onClick={() => navigate('/onboarding/birth-info')}
          >
            <Calendar className="w-8 h-8" />
            <div>
              <div className="font-semibold text-lg">I Know My Birth Details</div>
              <div className="text-sm opacity-90">
                Date, time, and location for personalized insights
              </div>
            </div>
          </Button>

          <Button
            variant="cosmic-outline"
            size="lg"
            className="w-full h-auto py-6 flex flex-col gap-2"
            onClick={() => navigate('/onboarding/quiz')}
          >
            <HelpCircle className="w-8 h-8" />
            <div>
              <div className="font-semibold text-lg">Take a Quick Quiz</div>
              <div className="text-sm">
                Answer a few questions about your natural rhythms
              </div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/onboarding/privacy')}
          >
            Skip for now
          </Button>
        </div>
      </Card>
    </div>
  );
}
