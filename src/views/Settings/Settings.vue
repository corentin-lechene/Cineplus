<script setup lang="ts">

import {IonPage, IonIcon, IonText, IonContent, IonActionSheet} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {add} from "ionicons/icons";

import {Subscription} from "@/models";
import Header from "@/components/headers/Header.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import SubscriptionImage from "@/components/SubscriptionImage.vue";
import Separator from "@/components/Separator.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import SubscriptionSettings from "@/components/modals/SubscriptionSettings.vue";
import {ToastService} from "@/services/toast.service";
import SubscriptionAdd from "@/components/modals/SubscriptionAdd.vue";

const router = useRouter();
const userStore = useUserStore();

const subscription = ref<Subscription | null>(null);
const openModalReset = ref(false);
const openModalSubscriptionSetting = ref(false);
const openModalAddSubscription = ref(false);
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
      .then(() => subscription.value = userStore.lastSubscription);
});


function updateSubscription() {
  if(!userStore.user || !subscription.value) {
    return;
  }

  const index = userStore.user.subscriptions.findIndex(s => s.id === subscription.value!.id);
  userStore.user.subscriptions[index] = subscription.value;
  userStore.updateUser(userStore.user)
      .catch(() => ToastService.error('Une erreur est survenue').catch())
      .finally(() => openModalSubscriptionSetting.value = false);
}

function addSubscription(newSubscription: Subscription) {
  if(!userStore.user) {
    return;
  }

  userStore.user.subscriptions.push(newSubscription);
  userStore.updateUser(userStore.user)
      .then(() => subscription.value = newSubscription)
      .catch(() => ToastService.error('Une erreur est survenue').catch())
      .finally(() => openModalAddSubscription.value = false);
}
function resetApp(e: CustomEvent) {
  if (e?.detail?.data?.action === 'delete') {
    openModalReset.value = true;
    userStore.resetUser();
    router.replace('/intro');
  }
}
</script>

<template>
  <ion-page>

    <Header title="Paramètres" back-button default-href="/home"/>

    <ion-content>
      <div class="px-4 flex flex-col gap-y-2">

        <div v-if="subscription" class="flex flex-col gap-y-2.5">
          <div class="flex flex-row justify-between items-center">
            <ion-text color="dark" class="text-2xl">Mon abonnement</ion-text>
            <ion-icon :icon="add" size="large" @click="openModalAddSubscription = true"></ion-icon>
          </div>
          <SubscriptionImage :subscription="subscription" @click="openModalSubscriptionSetting = true"/>
        </div>

        <Separator class="my-2"/>
        <app-button color="danger" text="Réinitialiser" bg-color="light" @onTap="openModalReset = true"/>
      </div>

      <!-- Modals     -->
      <BaseModal v-model="openModalSubscriptionSetting">
        <SubscriptionSettings v-model="subscription" @onSave="updateSubscription()"/>
      </BaseModal>

      <BaseModal v-model="openModalAddSubscription">
        <SubscriptionAdd @onSave="addSubscription" />
      </BaseModal>
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