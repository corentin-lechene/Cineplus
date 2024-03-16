<script lang="ts" setup>

import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
  IonToolbar
} from "@ionic/vue";
import MovieList from "@/components/movie/MovieList.vue";
import {filmOutline, ticketOutline} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col class="flex items-center">
              <ion-label class="text-3xl font-medium">Dashboard</ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :force-overscroll="false" class="rounded-lg" color="light">

      <div class="ion-padding grid grid-cols-2 grid-rows-2 gap-5 text-center">
        <ion-card class="flex flex-col justify-center items-center">
          <ion-icon :icon="ticketOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2" color="medium">Bénéfices</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().profit - useUserStore().extraExpense }}€</ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center">
          <ion-icon :icon="filmOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2 leading-4" color="medium">Dépenses supplémentaires</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().extraExpense }}€</ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center row-start-2">
          <ion-icon :icon="ticketOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2" color="medium">Place gagnées</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">
            {{ Math.floor((useUserStore().profit - useUserStore().extraExpense) / useUserStore().sumTicketPrice) }}
          </ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center row-start-2">
          <ion-icon :icon="filmOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2 leading-4" color="medium">Films visionnés</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().movieWatched }}</ion-text>
        </ion-card>
      </div>

      <MovieList
          :movies="useUserStore().movieWatchedThisMonth.map(m => m.movie)"
          button
          class="ion-margin-horizontal"
          no-data-message="Aucun film ce mois-ci"
          title="Ce mois-ci"
      />
    </ion-content>

  </ion-page>
</template>

<style scoped>
  ion-card {
    margin: 0;
    padding: 0.75em;
  }
</style>