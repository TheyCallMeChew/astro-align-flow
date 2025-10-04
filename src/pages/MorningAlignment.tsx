import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnergySlider } from "@/components/ui/energy-slider";
import { TaskManager } from "@/components/ui/task-manager";
import { CosmicTimer } from "@/components/ui/cosmic-timer";
import { useNavigate } from "react-router-dom";
import { Sun, Sunrise, Sparkles, Heart, ChevronRight } from "lucide-react";

export default function MorningAlignment() {
  const navigate = useNavigate();
  const [energy, setEnergy] = useState(0.7);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Energy Check", icon: Sun },
    { title: "Daily Quote", icon: Sparkles },
    { title: "Meditation", icon: Heart },
    { title: "Intentions", icon: Sunrise }
  ];

  const dailyQuote = "Trust your Aries spark. Start small, move steadily. ✨";
  const introspectiveQuestion = "As a Generator, what one action today aligns with your deepest yes?";
  
  const getMeditationScript = (energyLevel: number) => {
    if (energyLevel < 0.33) {
      return "Low-energy meditation: Sit comfortably, breathe softly. Inhale for 4, hold for 2, exhale for 6. Imagine a gentle ember warming your core, slowly growing brighter with each breath.";
    } else if (energyLevel < 0.66) {
      return "Balanced meditation: Practice box breathing - inhale for 4, hold for 4, exhale for 4, hold for 4. Visualize a calm lake reflecting the morning sky. Place one intention on its surface and watch it glow.";
    } else {
      return "High-energy meditation: Powerful breathing - inhale energy for 4, exhale focus for 4. Feel the cosmic force flowing through you. Channel this vibrant energy into one bold step forward today.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nebula pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Mobile Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Sunrise className="w-7 h-7 text-primary animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Morning Alignment
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Begin your day with cosmic intention
          </p>
        </div>

        {/* Progress Steps - Mobile Optimized */}
        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-xs
                    ${isActive ? 'bg-gradient-cosmic text-white shadow-glow' : 
                      isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                  `}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-medium whitespace-nowrap">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Inspiration - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-center justify-center text-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              Today's Cosmic Message
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <blockquote className="text-sm italic text-foreground border-l-2 border-primary pl-3">
              {dailyQuote}
            </blockquote>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-medium text-primary mb-1">Reflection:</p>
              <p className="text-xs text-foreground">{introspectiveQuestion}</p>
            </div>
          </CardContent>
        </Card>

        {/* Energy Check - Mobile Optimized */}
        <EnergySlider value={energy} onChange={setEnergy} />
        
        {/* Meditation - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-4 h-4 text-primary" />
              Guided Meditation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-card/30 rounded-lg border border-muted/20">
              <p className="text-xs text-foreground leading-relaxed">
                {getMeditationScript(energy)}
              </p>
            </div>
            <CosmicTimer duration={180} title="3-Minute Flow" />
          </CardContent>
        </Card>

        {/* Daily Intentions - Mobile Optimized */}
        <TaskManager maxTasks={3} title="Daily Intentions" />

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            variant="cosmic" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Complete Morning Ritual
          </Button>
          <Button 
            variant="cosmic-outline" 
            size="lg"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}