<script setup lang="ts">
import {onMounted} from "vue";
import {IonContent, IonFooter, IonPage} from "@ionic/vue";
import subscriptionsData from "@/data/subscriptions.json";
import AppButton from "@/components/buttons/AppButton.vue";

onMounted(() => {
  console.log('Intro page mounted');
  const subscriptions = subscriptionsData;
  console.log("subscriptions: ", subscriptions);
})
</script>

<template>
  <ion-page class="px-4">

    <ion-content>
      <img class="w-56 h-56" src="@/assets/logos/cinema-en-illimite.png" alt="logo" />
    </ion-content>

    <ion-footer class="py-4">
      <app-button class="h-full" color="dark" text="Continuer" />
    </ion-footer>

  </ion-page>
</template>