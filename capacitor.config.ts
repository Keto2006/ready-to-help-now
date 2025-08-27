import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.88a58d8fd4be420b9a2f400c96e5bd4e',
  appName: 'SafeZone',
  webDir: 'dist',
  server: {
    url: 'https://88a58d8f-d4be-420b-9a2f-400c96e5bd4e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;