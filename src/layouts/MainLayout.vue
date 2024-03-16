<script lang="ts" setup>

import {getPlatforms, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/vue";
import {grid, home, search} from "ionicons/icons";
import {computed} from "vue";

// todo create global utils
const isIos = computed(() => {
  const platforms = getPlatforms();
  const ios = ["ios", "ipad", "iphone"];
  return platforms.find(p => ios.includes(p));
});

</script>

<template>
  <ion-page>
    <ion-tabs style="background-color: var(--ion-color-light)">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" :class="{'rounded-b-3xl': isIos}" class="m-1.5 py-2 rounded-lg" style="background-color: white">
        <ion-tab-button href="/home" style="background-color: white" tab="home">
          <ion-icon :icon="home"/>
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button href="/dashboard" style="background-color: white" tab="library">
          <ion-icon :icon="grid"/>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>

        <ion-tab-button href="/movies/search" style="background-color: white" tab="search">
          <ion-icon :icon="search"/>
          <ion-label>Rechercher</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<style scoped>

</style>