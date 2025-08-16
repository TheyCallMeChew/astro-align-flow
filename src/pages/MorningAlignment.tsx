import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnergySlider } from "@/components/ui/energy-slider";
import { TaskManager } from "@/components/ui/task-manager";
import { CosmicTimer } from "@/components/ui/cosmic-timer";
import { Sun, Sunrise, Sparkles, Heart, ChevronRight } from "lucide-react";

export default function MorningAlignment() {
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
    <div className="min-h-screen bg-gradient-nebula">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sunrise className="w-8 h-8 text-primary animate-float" />
            <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Morning Alignment
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Begin your day with cosmic intention
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                    ${isActive ? 'bg-gradient-cosmic text-white shadow-glow' : 
                      isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                  `}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Daily Inspiration */}
          <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
                Today's Cosmic Message
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <blockquote className="text-lg italic text-foreground border-l-4 border-primary pl-4">
                {dailyQuote}
              </blockquote>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary mb-2">Reflection Question:</p>
                <p className="text-foreground">{introspectiveQuestion}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Energy Check */}
            <div className="space-y-6">
              <EnergySlider value={energy} onChange={setEnergy} />
              
              {/* Meditation */}
              <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Guided Meditation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-card/30 rounded-lg border border-muted/20">
                    <p className="text-sm text-foreground leading-relaxed">
                      {getMeditationScript(energy)}
                    </p>
                  </div>
                  <CosmicTimer duration={180} title="3-Minute Flow" />
                </CardContent>
              </Card>
            </div>

            {/* Daily Intentions */}
            <div>
              <TaskManager maxTasks={3} title="Daily Intentions" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Button variant="cosmic" size="lg" className="px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Complete Morning Ritual
            </Button>
            <Button variant="cosmic-outline" size="lg">
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}