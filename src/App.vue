<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {App} from "@capacitor/app";
import * as LiveUpdates from '@capacitor/live-updates';
import {onMounted} from "vue";
import {Capacitor} from "@capacitor/core";


onMounted(() => {
  try {
    initializeApp()
  } catch(e) {
    console.error(e);
  }
})

async function initializeApp() {
  if(Capacitor.getPlatform() !== 'web') {
    // Register event to fire each time user resumes the app
    App.addListener('resume', async () => {
      if (localStorage.shouldReloadApp) {
        await LiveUpdates.reload();
        console.log("[LiveUpdates]: Reload");
      }
      else {
        const result = await LiveUpdates.sync();
        localStorage.shouldReloadApp = result.activeApplicationPathChanged;
        console.log(`[LiveUpdates]: Sync: ${JSON.stringify(result)}`);
      }
    });

    // First sync on app load
    const result = await LiveUpdates.sync();
    localStorage.shouldReloadApp = result.activeApplicationPathChanged;
  }
}
</script>
