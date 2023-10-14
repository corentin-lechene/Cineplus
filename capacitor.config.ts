import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.corentinlechene.cineplus',
  appName: 'cineplus',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
