import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TaskManager } from "@/components/ui/task-manager";
import { Moon, Star, Heart, Sparkles, CheckCircle, BookOpen } from "lucide-react";

export default function EveningReflection() {
  const [gratitude, setGratitude] = useState("");
  const [synchronicities, setSynchronicities] = useState("");
  const [reflection, setReflection] = useState("");
  const [energy, setEnergy] = useState(75);

  // Mock completed tasks for the day
  const completedTasks = [
    { id: "1", title: "Morning meditation", completed: true },
    { id: "2", title: "Work on creative project", completed: true },
    { id: "3", title: "Call with mentor", completed: false }
  ];

  const reflectionPrompts = [
    "What brought you the most joy today?",
    "What challenged you and how did you grow?",
    "What synchronicities or signs did you notice?",
    "How did your energy flow throughout the day?"
  ];

  const handleSaveReflection = () => {
    // In real app, save to database
    console.log("Saving reflection:", { gratitude, synchronicities, reflection, energy });
    // Show toast notification
  };

  return (
    <div className="min-h-screen bg-gradient-nebula">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Moon className="w-8 h-8 text-primary animate-float" />
            <h1 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Evening Reflection
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Honor your day's journey with gratitude
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Daily Review */}
          <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Today's Intentions Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-muted/20"
                >
                  <div className={`w-4 h-4 rounded-full ${
                    task.completed ? 'bg-gradient-cosmic' : 'bg-muted'
                  }`} />
                  <span className={`flex-1 ${
                    task.completed 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  }`}>
                    {task.title}
                  </span>
                  <Badge variant={task.completed ? "default" : "outline"}>
                    {task.completed ? "Complete" : "In Progress"}
                  </Badge>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Energy Summary</span>
                </div>
                <p className="text-foreground">
                  Your energy today: <span className="font-semibold text-primary">{energy}%</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {energy >= 80 ? "High energy - you were in flow!" :
                   energy >= 60 ? "Balanced energy - steady progress" :
                   energy >= 40 ? "Moderate energy - gentle accomplishments" :
                   "Low energy - rest was needed"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gratitude */}
            <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Gratitude
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  What filled your heart with appreciation today?
                </p>
                <Textarea
                  placeholder="I'm grateful for..."
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  className="min-h-[120px] bg-card/30 border-muted/30"
                />
              </CardContent>
            </Card>

            {/* Synchronicities */}
            <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Synchronicities & Signs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  What meaningful moments or cosmic nudges did you notice?
                </p>
                <Textarea
                  placeholder="Today the universe whispered..."
                  value={synchronicities}
                  onChange={(e) => setSynchronicities(e.target.value)}
                  className="min-h-[120px] bg-card/30 border-muted/30"
                />
              </CardContent>
            </Card>
          </div>

          {/* Deeper Reflection */}
          <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Daily Reflection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reflectionPrompts.map((prompt, index) => (
                  <div key={index} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-foreground italic">"{prompt}"</p>
                  </div>
                ))}
              </div>
              
              <Textarea
                placeholder="Reflect on your day's journey..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-[150px] bg-card/30 border-muted/30"
              />
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex justify-center gap-4 pt-8">
            <Button 
              variant="cosmic" 
              size="lg" 
              className="px-8"
              onClick={handleSaveReflection}
            >
              <Moon className="w-5 h-5 mr-2" />
              Save Evening Reflection
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