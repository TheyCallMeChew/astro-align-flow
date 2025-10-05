import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d1bf55e2e53e499cb5b6960fd2cf6277',
  appName: 'AstroFlow',
  webDir: 'dist',
  // Remove server.url for production builds - iOS loads from bundled assets (capacitor://localhost)
  // For dev with live reload, temporarily add: server: { url: 'YOUR_DEV_URL', cleartext: true }
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0b0f19',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#6366F1',
    },
  },
};

export default config;