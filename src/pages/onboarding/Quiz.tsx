import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/store';
import { ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 'energy_pattern',
    question: 'When do you typically feel most energized?',
    options: ['Early morning', 'Midday', 'Evening', 'Late night'],
  },
  {
    id: 'work_style',
    question: 'How do you prefer to approach tasks?',
    options: ['Plan everything', 'Mix of planning and spontaneity', 'Go with the flow', 'Structured flexibility'],
  },
  {
    id: 'social_energy',
    question: 'After social interactions, you typically feel:',
    options: ['Energized and ready for more', 'Content but need some alone time', 'Drained and need to recharge', 'It varies greatly'],
  },
  {
    id: 'challenge_response',
    question: 'When facing challenges, you tend to:',
    options: ['Tackle head-on immediately', 'Reflect before acting', 'Seek support and collaboration', 'Take breaks and come back refreshed'],
  },
  {
    id: 'natural_pace',
    question: 'Your natural pace of life is:',
    options: ['Fast and dynamic', 'Steady and consistent', 'Slow and intentional', 'Varies with seasons'],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { setProfile } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: answer };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setProfile({ quizResults: newAnswers });
      navigate('/onboarding/privacy');
    }
  };

  const question = questions[currentQ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Question {currentQ + 1} of {questions.length}
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-cosmic h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                size="lg"
                className="w-full h-auto py-4 justify-between text-left"
                onClick={() => handleAnswer(option)}
              >
                <span>{option}</span>
                <ChevronRight className="w-5 h-5 flex-shrink-0" />
              </Button>
            ))}
          </div>
        </div>

        {currentQ > 0 && (
          <Button
            variant="ghost"
            onClick={() => setCurrentQ(currentQ - 1)}
          >
            Back
          </Button>
        )}
      </Card>
    </div>
  );
}
