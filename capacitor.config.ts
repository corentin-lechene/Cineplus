import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.corentinlechene.cineplus',
  appName: 'cineplus',
  webDir: 'dist',
  plugins: {
    LiveUpdates: {
      appId: "124d77a8",
      channel: "Production",
      autoUpdateMethod: "background",
      maxVersions: 2
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
