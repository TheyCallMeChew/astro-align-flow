import { useState } from 'react';
import { useStore } from '@/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Download, Moon, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { scheduleReminders, requestNotificationPermission } from '@/lib/notifications';

export default function Settings() {
  const { toast } = useToast();
  const { profile, setProfile, exportData } = useStore();
  const [birthDate, setBirthDate] = useState(profile.birthDate || '');
  const [birthTime, setBirthTime] = useState(profile.birthTime || '');
  const [birthLocation, setBirthLocation] = useState(profile.birthLocation || '');
  const [middayTime, setMiddayTime] = useState(profile.middayReminderTime);
  const [eveningTime, setEveningTime] = useState(profile.eveningReminderTime);

  const handleSaveProfile = () => {
    setProfile({
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthLocation: birthLocation || undefined,
    });
    toast({ title: 'Profile updated successfully' });
  };

  const handleToggleLowEnergy = (checked: boolean) => {
    setProfile({ lowEnergyMode: checked });
    if (checked) {
      document.documentElement.classList.add('low-energy-mode');
    } else {
      document.documentElement.classList.remove('low-energy-mode');
    }
  };

  const handleToggleNotifications = async (checked: boolean) => {
    if (checked) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setProfile({ notificationsEnabled: true });
        await scheduleReminders(middayTime, eveningTime);
        toast({ title: 'Notifications enabled' });
      } else {
        toast({
          title: 'Permission denied',
          description: 'Please enable notifications in system settings',
          variant: 'destructive',
        });
      }
    } else {
      setProfile({ notificationsEnabled: false });
      toast({ title: 'Notifications disabled' });
    }
  };

  const handleUpdateReminders = async () => {
    setProfile({
      middayReminderTime: middayTime,
      eveningReminderTime: eveningTime,
    });
    if (profile.notificationsEnabled) {
      await scheduleReminders(middayTime, eveningTime);
    }
    toast({ title: 'Reminder times updated' });
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astroflow-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Data exported successfully' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-24 pt-6">
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-muted-foreground">Customize your AstroFlow experience</p>
        </div>

        {/* Profile */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Birth Information</h2>
          <p className="text-sm text-muted-foreground">
            Optional. Used for personalized insights and astrological context.
          </p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthTime">Birth Time (optional)</Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthLocation">Birth Location (optional)</Label>
              <Input
                id="birthLocation"
                placeholder="City, Country"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveProfile} variant="cosmic">
              Save Profile
            </Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Preferences</h2>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Low Energy Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Reduced motion and calmer palette
              </p>
            </div>
            <Switch
              checked={profile.lowEnergyMode}
              onCheckedChange={handleToggleLowEnergy}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Daily reminders for check-ins
              </p>
            </div>
            <Switch
              checked={profile.notificationsEnabled}
              onCheckedChange={handleToggleNotifications}
            />
          </div>
        </Card>

        {/* Reminder Times */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Reminder Times</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="middayTime">Midday Check-In</Label>
              <Input
                id="middayTime"
                type="time"
                value={middayTime}
                onChange={(e) => setMiddayTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="eveningTime">Evening Reflection</Label>
              <Input
                id="eveningTime"
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateReminders} variant="cosmic">
              Update Reminders
            </Button>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Privacy & Data</h2>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Use for Personalization</Label>
              <p className="text-sm text-muted-foreground">
                Use birth data for insights
              </p>
            </div>
            <Switch
              checked={profile.useForPersonalization}
              onCheckedChange={(checked) =>
                setProfile({ useForPersonalization: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share to Community</Label>
              <p className="text-sm text-muted-foreground">
                Anonymous sharing (off by default)
              </p>
            </div>
            <Switch
              checked={profile.shareToCommunity}
              onCheckedChange={(checked) =>
                setProfile({ shareToCommunity: checked })
              }
            />
          </div>

          <Button
            onClick={handleExportData}
            variant="outline"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Export My Data (JSON)
          </Button>
        </Card>
      </div>
    </div>
  );
}
