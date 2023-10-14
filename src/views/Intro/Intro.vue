<script setup lang="ts">
import {ref} from "vue";
import {IonContent, IonFooter, IonPage, IonText, IonIcon} from "@ionic/vue";
import {close} from "ionicons/icons";
import AppButton from "@/components/buttons/AppButton.vue";
import {Subscription, User} from "@/models";
import SubscriptionsSlides from "@/components/slides/SubscriptionsSlides.vue";
import SubscriptionSettings from "@/components/modals/SubscriptionSettings.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import BaseModal from "@/components/modals/BaseModal.vue";
import {ToastService} from "@/services/toast.service";
import Header from "@/components/headers/Header.vue";

const router = useRouter();

/* Data */
let selectedSubscription = ref<Subscription>();
let openModalSetting = ref(false);

const userStore = useUserStore();

async function createUser(subscription?: Subscription) {
  try {
    const newUser: User = {
      subscriptions: subscription ? [subscription] : [],
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
  } catch(e) {
      console.error(e);
      ToastService.error('Une erreur est survenue').catch();
  }
}

async function saveSubscription() {
  openModalSetting.value = false;

  if(!selectedSubscription.value) {
    ToastService.error('Le formulaire est invalid').catch();
    return;
  }

  selectedSubscription.value.id = 0;
  await createUser(selectedSubscription.value);
}

</script>

<template>
  <ion-page class="">

    <Header title="">
      <ion-icon class="absolute top-5 right-5" :icon="close" size="large" slot="end" @click="createUser()"></ion-icon>
    </Header>

    <ion-content>
      <div class="flex flex-col items-center h-full">
        <img class="h-48 mx-auto" src="@/assets/logos/cinema-en-illimite.png" alt="logo"/>
        <ion-text class="text-4xl mb-2">Configuration</ion-text>
        <ion-text class="text-xl">Choisir l'abonnement</ion-text>

        <!-- slides-->
        <div class="w-full h-full flex items-center bg-none" >
          <SubscriptionsSlides v-model="selectedSubscription"/>
        </div>

        <!-- modal       -->
        <BaseModal v-model="openModalSetting">
          <SubscriptionSettings
              v-if="selectedSubscription"
              v-model="selectedSubscription"
              @onSave="saveSubscription()"
              mode="create"
          />
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
