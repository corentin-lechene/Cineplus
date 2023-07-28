<script setup lang="ts">

import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {onMounted, reactive} from "vue";
import {Storage} from "@ionic/storage";
import {StorageEnum} from "@/models/StorageEnum";

const state = reactive({
  annualPrice: 0,
  unitaryPlace: 0,
});


onMounted(async () => {
  const storage = new Storage();
  await storage.create();

  const prices: {annualPrice: string, unitaryPlace: string} | null = await storage.get(StorageEnum.prices);
  state.annualPrice = parseFloat(prices?.annualPrice || "0");
  state.unitaryPlace = parseFloat(prices?.unitaryPlace || "0");
})

async function saveSetting() {
  if(state.annualPrice <= 0 || state.unitaryPlace <= 0) {
    return;
  }

  const storage = new Storage();
  await storage.create();

  await storage.set(StorageEnum.prices, {annualPrice: state.annualPrice, unitaryPlace: state.unitaryPlace});
}

</script>

<template>
  <ion-page>

    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button class="text-tertiary"></ion-back-button>
        </ion-buttons>
        <ion-title color="tertiary">Configuration</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">

      <ion-label color="light">Votre abonnement illimité</ion-label>
      <div class="my-1"></div>
      <div class="flex items-center justify-center h-44 bg-blue-950 rounded-xl relative text-white">
        <div class="m-auto text-2xl pb-2.5">Ma Carte Illimité</div>
        <div class="absolute bottom-3 right-3 text-center text-sm">Le<br>Club</div>
      </div>

      <div class="my-5"></div>

      <ion-label color="light">Configurer les prix</ion-label>
      <div class="my-1"></div>
      <ion-input
        v-model="state.annualPrice"
        class="input"
        label="Prix annuel"
        type="number"
        inputmode="decimal"
        placeholder="Saisir le prix"
      />
      <div class="my-2.5"></div>
      <ion-input
          v-model="state.unitaryPlace"
          class="input"
          label="Prix d'une place"
          type="number"
          inputmode="decimal"
          placeholder="Saisir le prix"
      />


    </ion-content>

    <ion-footer>
      <ion-toolbar color="dark">
        <ion-button type="submit" expand="full" class="text-black bg-primary rounded-xl" @click="saveSetting()">Sauvegarder</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>