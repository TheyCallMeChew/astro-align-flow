import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

interface EnergySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function EnergySlider({ value, onChange }: EnergySliderProps) {
  const getEnergyColor = (energy: number) => {
    if (energy < 0.33) return "text-red-400";
    if (energy < 0.66) return "text-yellow-400";
    return "text-green-400";
  };

  const getEnergyLabel = (energy: number) => {
    if (energy < 0.33) return "Low Energy";
    if (energy < 0.66) return "Balanced";
    return "High Energy";
  };

  return (
    <Card className="bg-gradient-subtle border-muted/50 shadow-soft">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Energy Level</h3>
            <div className="text-right">
              <div className={`text-xl font-bold ${getEnergyColor(value)}`}>
                {Math.round(value * 100)}%
              </div>
              <div className={`text-sm ${getEnergyColor(value)}`}>
                {getEnergyLabel(value)}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Slider
              value={[value]}
              onValueChange={([newValue]) => onChange(newValue)}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Drained</span>
              <span>Balanced</span>
              <span>Energized</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}