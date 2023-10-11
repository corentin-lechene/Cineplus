<script setup lang="ts">

import {IonContent, IonPage, IonIcon, IonNote, IonText} from "@ionic/vue";
import {add} from "ionicons/icons";
import Header from "@/components/headers/Header.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import SubscriptionImage from "@/components/SubscriptionImage.vue";
import BaseList from "@/components/lists/BaseList.vue";

const userStore = useUserStore();

const currentUser = ref(userStore.user);

const openSubHistory = ref(false);


</script>

<template>
  <ion-page>
    <Header title="Mes abonnements" backButton no-text default-href="/settings"/>
    <ion-content color="tertiary" class="ion-padding">
      <div v-if="currentUser" class="flex flex-col">
        <div class="flex flex-row justify-between items-center mb-2">
          <ion-text color="dark" class="text-2xl">Mon abonnement</ion-text>
          <ion-icon :icon="add" size="large" color="secondary"></ion-icon>
        </div>
        <ion-note v-if="!userStore.lastSubscription" class="flex items-center justify-center h-40">Pas d'abonnement</ion-note>
        <SubscriptionImage v-else :subscription="userStore.lastSubscription" @click="openSubHistory = true"/>

        <div v-if="currentUser.subscriptions.length > 1">
          <BaseList title="Autre abonnements">
            <div v-for="sub in currentUser.subscriptions" class="">{{sub.name}}</div>
          </BaseList>
        </div>
        <!-- Autre abonnements       -->
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>