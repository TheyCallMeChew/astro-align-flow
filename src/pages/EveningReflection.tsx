import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TaskManager } from "@/components/ui/task-manager";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/hooks/use-app-state";
import { useToast } from "@/hooks/use-toast";
import { Moon, Star, Heart, Sparkles, CheckCircle, BookOpen } from "lucide-react";

export default function EveningReflection() {
  const navigate = useNavigate();
  const { addReflection, getTodayReflection } = useAppState();
  const { toast } = useToast();
  
  const [gratitude, setGratitude] = useState("");
  const [synchronicities, setSynchronicities] = useState("");
  const [reflection, setReflection] = useState("");
  const [energy, setEnergy] = useState(75);

  useEffect(() => {
    const todayReflection = getTodayReflection();
    if (todayReflection) {
      setGratitude(todayReflection.gratitude);
      setSynchronicities(todayReflection.synchronicities);
      setReflection(todayReflection.reflection);
      setEnergy(todayReflection.energy);
    }
  }, []);

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
    const today = new Date().toISOString().split('T')[0];
    addReflection({
      date: today,
      gratitude,
      synchronicities,
      reflection,
      energy,
      completedTasks: completedTasks.filter(t => t.completed).map(t => t.title)
    });
    
    toast({
      title: "Reflection Saved ✨",
      description: "Your cosmic journey has been recorded",
    });
    
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-nebula pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Mobile Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Moon className="w-7 h-7 text-primary animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Evening Reflection
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Honor your day's journey with gratitude
          </p>
        </div>

        {/* Daily Review - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="w-4 h-4 text-primary" />
              Today's Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-card/30 border border-muted/20"
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  task.completed ? 'bg-gradient-cosmic' : 'bg-muted'
                }`} />
                <span className={`flex-1 text-sm ${
                  task.completed 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                }`}>
                  {task.title}
                </span>
                <Badge variant={task.completed ? "default" : "outline"} className="text-xs">
                  {task.completed ? "✓" : "•"}
                </Badge>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Energy Summary</span>
              </div>
              <p className="text-sm text-foreground">
                Your energy today: <span className="font-semibold text-primary">{energy}%</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {energy >= 80 ? "High energy - you were in flow!" :
                 energy >= 60 ? "Balanced energy - steady progress" :
                 energy >= 40 ? "Moderate energy - gentle accomplishments" :
                 "Low energy - rest was needed"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gratitude - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-4 h-4 text-primary" />
              Gratitude
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              What filled your heart with appreciation today?
            </p>
            <Textarea
              placeholder="I'm grateful for..."
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="min-h-[100px] bg-card/30 border-muted/30 text-sm"
            />
          </CardContent>
        </Card>

        {/* Synchronicities - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              Synchronicities & Signs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              What meaningful moments or cosmic nudges did you notice?
            </p>
            <Textarea
              placeholder="Today the universe whispered..."
              value={synchronicities}
              onChange={(e) => setSynchronicities(e.target.value)}
              className="min-h-[100px] bg-card/30 border-muted/30 text-sm"
            />
          </CardContent>
        </Card>

        {/* Deeper Reflection - Mobile Optimized */}
        <Card className="bg-gradient-subtle border-muted/50 shadow-cosmic">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-4 h-4 text-primary" />
              Daily Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {reflectionPrompts.map((prompt, index) => (
                <div key={index} className="p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-foreground italic">"{prompt}"</p>
                </div>
              ))}
            </div>
            
            <Textarea
              placeholder="Reflect on your day's journey..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[120px] bg-card/30 border-muted/30 text-sm"
            />
          </CardContent>
        </Card>

        {/* Save Actions - Mobile Optimized */}
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            variant="cosmic" 
            size="lg" 
            className="w-full"
            onClick={handleSaveReflection}
            disabled={!gratitude && !reflection}
          >
            <Moon className="w-5 h-5 mr-2" />
            Save Evening Reflection
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