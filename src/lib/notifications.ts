import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  try {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Failed to request notification permissions:', error);
    return false;
  }
}

export async function scheduleReminders(
  middayTime: string,
  eveningTime: string
) {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }] });

    const [middayHour, middayMin] = middayTime.split(':').map(Number);
    const [eveningHour, eveningMin] = eveningTime.split(':').map(Number);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Midday Check-In',
          body: 'How is your energy? Take a moment to pause and reflect.',
          schedule: {
            on: {
              hour: middayHour,
              minute: middayMin,
            },
            allowWhileIdle: true,
          },
        },
        {
          id: 2,
          title: 'Evening Reflection',
          body: 'Time to reflect on your day and celebrate your wins.',
          schedule: {
            on: {
              hour: eveningHour,
              minute: eveningMin,
            },
            allowWhileIdle: true,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Failed to schedule notifications:', error);
  }
}
