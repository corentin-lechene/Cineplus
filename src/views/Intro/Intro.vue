<script setup lang="ts">
import {ref} from "vue";
import {IonContent, IonFooter, IonHeader, IonLabel, IonModal, IonPage} from "@ionic/vue";
import AppButton from "@/components/buttons/AppButton.vue";
import {Subscription, User} from "@/models";
import SubscriptionsSlides from "@/components/slides/SubscriptionsSlides.vue";
import SubscriptionSettings from "@/components/modals/SubscriptionSettings.vue";
import {UserService} from "@/services/user.service";
import {useRouter} from "vue-router";

const router = useRouter();

/* Data */
let selectedSubscription = ref<Subscription>();
let openModalSetting = ref(false);


async function saveSubscription() {
  //todo add notification
  openModalSetting.value = false;

  if(!selectedSubscription.value) {
    console.error('No subscription selected');
    return;
  }

  const newUser: User = {
    subscriptions: [selectedSubscription.value],
    movies: [],
    preferences: {
      language: "fr"
    }
  };

  await UserService.saveUser(newUser);
  await router.replace('/home');
}
</script>

<template>
  <ion-page class="px-4">

    <ion-header class="py-4 flex">
      <img class="h-48 mx-auto" src="@/assets/logos/cinema-en-illimite.png" alt="logo"/>
    </ion-header>

    <ion-content>
      <div class="flex flex-col items-center h-full">
        <ion-label class="text-4xl mb-2">Configuration</ion-label>
        <ion-label class="text-xl">Choisir l'abonnement</ion-label>

        <!-- slides-->
        <div class="w-full h-full flex items-center bg-none">
          <SubscriptionsSlides v-model="selectedSubscription"/>
        </div>

        <!-- modal       -->
        <ion-modal trigger="open-modal" :is-open="openModalSetting" :initial-breakpoint="1" :breakpoints="[0, 1]">
          <SubscriptionSettings id="open-modal" v-model="selectedSubscription" @close="saveSubscription"/>
        </ion-modal>
      </div>
    </ion-content>

    <ion-footer class="py-4">
      <app-button id="open-modal" class="h-full" color="dark" text="Continuer" @onTap="openModalSetting = true"/>
    </ion-footer>

  </ion-page>
</template>

<style>

ion-modal {
  --height: auto;
}
</style>
