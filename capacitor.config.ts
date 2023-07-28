import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.corentinlechene.cinemaenillimite',
  appName: 'cinema-en-illimite',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
