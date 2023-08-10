<script setup lang="ts">

import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonLabel,
  IonContent,
  IonActionSheet
} from "@ionic/vue";
import AppHeader from "@/components/headers/AppHeader.vue";
import SubscriptionImage from "@/components/SubscriptionImage.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {Subscription} from "@/models";
import AppButton from "@/components/buttons/AppButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const subscription = ref<Subscription | null>(null);
const openModalReset = ref(false);
const actionSheetButtons = [
  {
    text: 'Delete',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: 'Cancel',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
];


onMounted(() => {
  userStore.loadUser()
      .then(() => subscription.value = userStore.getLastSubscription);
});

function resetApp(e: CustomEvent) {
  if(e.detail.data.action === 'delete') {
    openModalReset.value = true;
    userStore.resetUser();
    router.replace('/intro');
  }
}
</script>

<template>
  <ion-page>

    <AppHeader class="flex flex-row justify-between">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title color="dark" class="text-2xl">Paramètres</ion-title>
      </ion-toolbar>
    </AppHeader>

    <ion-content>
      <div class="px-4">

        <div v-if="subscription" class="flex flex-col gap-y-2.5">
          <div class="flex flex-row justify-between items-center">
            <ion-label color="dark" class="text-2xl">Mon abonnement</ion-label>
<!--            <ion-icon :icon="add" size="large"></ion-icon>-->
          </div>
          <SubscriptionImage :image-url="subscription?.imageUrl || ''"/>
          <ion-text color="medium" class="text-center">{{ subscription?.name }}</ion-text>
        </div>


        <div class="h-0.5 w-full bg-gray-400 my-5"></div>
        <app-button color="danger" text="Réinitialiser" bg-color="light" @onTap="openModalReset = true"/>
      </div>
    </ion-content>

    <ion-action-sheet
      :buttons="actionSheetButtons"
      :is-open="openModalReset"
      header="Reinitialiser"
      @didDismiss="resetApp"
    />
  </ion-page>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>