<script setup lang="ts">
import {ref} from "vue";
import {IonContent, IonFooter, IonHeader, IonPage, IonText, toastController} from "@ionic/vue";
import AppButton from "@/components/buttons/AppButton.vue";
import {Subscription, User} from "@/models";
import SubscriptionsSlides from "@/components/slides/SubscriptionsSlides.vue";
import SubscriptionSettings from "@/components/modals/SubscriptionSettings.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import BaseModal from "@/components/modals/BaseModal.vue";
import {ToastService} from "@/services/toast.service";

const router = useRouter();

/* Data */
let selectedSubscription = ref<Subscription>();
let openModalSetting = ref(false);

const userStore = useUserStore();


async function saveSubscription() {
  openModalSetting.value = false;

  if(!selectedSubscription.value) {
    ToastService.error('Le formulaire est invalid').catch();
    return;
  }

  const newUser: User = {
    subscriptions: [selectedSubscription.value],
    viewedMovies: [],
    watchlist: [],
    preferences: {
      language: "fr"
    },
    isConfigured: true
  };

  await userStore.setUser(newUser);
  ToastService.success('Bienvenue sur Cine+').catch();
  await router.replace('/home');
}
</script>

<template>
  <ion-page class="">

    <ion-header class="px-4 py-4 flex">
      <img class="h-48 mx-auto" src="@/assets/logos/cinema-en-illimite.png" alt="logo"/>
    </ion-header>

    <ion-content>
      <div class="flex flex-col items-center h-full">
        <ion-text class="text-4xl mb-2">Configuration</ion-text>
        <ion-text class="text-xl">Choisir l'abonnement</ion-text>

        <!-- slides-->
        <div class="w-full h-full flex items-center bg-none" >
          <SubscriptionsSlides v-model="selectedSubscription"/>
        </div>

        <!-- modal       -->
        <BaseModal v-model="openModalSetting">
          <SubscriptionSettings v-model="selectedSubscription" @onSave="saveSubscription()" />
        </BaseModal>
      </div>
    </ion-content>

    <ion-footer class="py-4 px-4">
      <app-button class="h-full" color="dark" text="Configurer" @onTap="openModalSetting = true"/>
    </ion-footer>

  </ion-page>
</template>

<style>

ion-modal {
  --height: auto;
}
</style>
