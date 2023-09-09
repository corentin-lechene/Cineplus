<script setup lang="ts">

import {IonPage, IonIcon, IonText, IonContent, IonActionSheet, IonCard} from "@ionic/vue";
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
import dayjs from "@/configs/dayjs.config";
import {SubscriptionService} from "@/services/subscription.service";
import {DateUtil} from "@/utils/date.util";

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
      .then(() => subscription.value = JSON.parse(JSON.stringify(userStore.lastSubscription)));
});


function addSubscription(newSubscription: Subscription) {
  if(!userStore.user || !SubscriptionService.isValid(newSubscription)) {
    ToastService.error('Une erreur est survenue').catch();
    return;
  }

  // si update
  if(openModalSubscriptionSetting.value && userStore.lastSubscription) {
    const startAt = dayjs(userStore.lastSubscription.startAt);
    const diff = DateUtil.getDiff(startAt.toDate(), userStore.lastSubscription.expireAt)
    userStore.lastSubscription.expireAt = startAt
        .add(diff, 'month')
        .format('YYYY-MM-DD');

    newSubscription.startAt = userStore.lastSubscription.expireAt;
  }

  //si create
  if(openModalAddSubscription.value && userStore.lastSubscription) {
    const startAt = dayjs(userStore.lastSubscription.startAt);
    const diff = DateUtil.getDiff(startAt.toDate(), userStore.lastSubscription.expireAt)
    userStore.lastSubscription.expireAt = startAt
        .add(diff, 'month')
        .format('YYYY-MM-DD');
  }

  newSubscription.id = userStore.user.subscriptions.length;
  userStore.user.subscriptions.push(newSubscription);
  userStore.updateUser(userStore.user)
      .then(() => subscription.value = JSON.parse(JSON.stringify(newSubscription)))
      .catch(() => ToastService.error('Une erreur est survenue').catch())
      .finally(() => {
        openModalSubscriptionSetting.value = false;
        openModalAddSubscription.value = false;
      });
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
        <div v-else>
          <ion-text color="dark" class="text-2xl">Mon abonnement</ion-text>
          <ion-card class="m-0 flex h-40">
            <ion-icon class="m-auto" :icon="add" size="large" @click="openModalAddSubscription = true"></ion-icon>
          </ion-card>
        </div>

        <Separator class="my-2"/>
        <app-button color="danger" text="Réinitialiser" bg-color="light" @onTap="openModalReset = true"/>
      </div>

      <!-- Modals     -->
      <BaseModal v-model="openModalSubscriptionSetting">
        <SubscriptionSettings
            v-if="subscription"
            v-model="subscription"
            @onSave="addSubscription"
            mode="update"
        />
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

    <ion-text class="italic" @click="$router.push('/privacy')">politique de confidentialité</ion-text>
  </ion-page>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>