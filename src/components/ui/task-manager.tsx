import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Star } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
}

interface TaskManagerProps {
  maxTasks?: number;
  title?: string;
}

export function TaskManager({ maxTasks = 3, title = "Daily Intentions" }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() && tasks.length < maxTasks) {
      const task: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            {title}
          </span>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.length < maxTasks && (
          <div className="flex gap-2">
            <Input
              placeholder={`Add intention ${tasks.length + 1}/${maxTasks}`}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1"
            />
            <Button 
              onClick={addTask}
              size="icon"
              className="bg-gradient-cosmic border-0 hover:shadow-glow"
              disabled={!newTask.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-muted/30"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="data-[state=checked]:bg-gradient-cosmic data-[state=checked]:border-0"
              />
              <span
                className={`flex-1 ${
                  task.completed 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground"
                }`}
              >
                {task.title}
              </span>
              <Button
                onClick={() => removeTask(task.id)}
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Set your daily intentions</p>
            <p className="text-sm">Focus on what truly matters</p>
          </div>
        )}

        {completedCount === tasks.length && tasks.length > 0 && (
          <div className="text-center py-4">
            <div className="text-primary font-semibold">✨ All intentions complete! ✨</div>
            <div className="text-sm text-muted-foreground mt-1">
              You're aligned with your purpose today
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}