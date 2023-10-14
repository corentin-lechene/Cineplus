<script setup lang="ts">

import {IonContent, IonPage, IonIcon, IonNote, IonText, IonItem, IonLabel} from "@ionic/vue";
import {add} from "ionicons/icons";
import Header from "@/components/headers/Header.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import SubscriptionImage from "@/components/SubscriptionImage.vue";
import BaseList from "@/components/lists/BaseList.vue";
import NewSubModal from "@/components/modals/NewSubModal.vue";

const userStore = useUserStore();

const currentUser = ref(userStore.user);

const openSubHistory = ref(false);
const openNewSub = ref(false);


</script>

<template>
  <ion-page>
    <Header title="Mes abonnements" backButton no-text default-href="/settings"/>
    <ion-content color="tertiary" class="ion-padding">
      <div v-if="currentUser" class="flex flex-col">
        <div class="flex flex-row justify-between items-center mb-2">
          <ion-text color="dark" class="text-2xl">Mon abonnement</ion-text>
          <ion-icon :icon="add" size="large" color="secondary" @click="openNewSub = true"></ion-icon>
        </div>
        <ion-note v-if="!userStore.lastSubscription" class="flex items-center justify-center h-40">Pas d'abonnement</ion-note>
        <SubscriptionImage v-else :subscription="userStore.lastSubscription" @click="openSubHistory = true"/>

        <!-- Autre abonnements       -->
        <BaseList v-if="currentUser.subscriptions.length > 1" title="Autre abonnements">
          <ion-item
            v-for="sub in currentUser.subscriptions.slice(0, currentUser.subscriptions.length - 1)"
            :key="sub.id"
            class=""
            lines="full"
            button
          >
            <SubscriptionImage :subscription="sub" slot="start" class="py-2 mr-2 sm:mr-5" type="icon" no-title/>
            <div class="flex flex-col">
              <ion-text>{{ sub.name }}</ion-text>
              <ion-note>{{ sub.price.toFixed(2).replace('.', ',') }}€ / mois</ion-note>
            </div>
          </ion-item>
        </BaseList>
      </div>

      <NewSubModal v-model="openNewSub"/>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>