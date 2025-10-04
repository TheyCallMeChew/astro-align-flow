import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Configure status bar for mobile
if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#0b0f19' });
}

createRoot(document.getElementById("root")!).render(<App />);
