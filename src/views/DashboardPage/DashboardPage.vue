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
import {cashOutline, filmOutline, iceCreamOutline, ticketOutline} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
import {computed} from "vue";

const ticketEarned = computed(() => {
  const result = useUserStore().profit / useUserStore().sumTicketPrice;
  if(isNaN(result)) return 0;
  return Math.floor(result);
})
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
          <ion-icon :icon="cashOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2" color="medium">Total bénéfices</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().profit.toFixed(2) }}€</ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center">
          <ion-icon :icon="iceCreamOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2 leading-4" color="medium">Dépenses supplémentaires</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().extraExpense.toFixed(2) }}€</ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center row-start-2">
          <ion-icon :icon="ticketOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2" color="medium">Place gagnées</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">
            {{ ticketEarned }}
          </ion-text>
        </ion-card>
        <ion-card class="flex flex-col justify-center items-center row-start-2">
          <ion-icon :icon="filmOutline" class="bg-gray-100 p-5 rounded-full" size="large"></ion-icon>
          <ion-text class="mt-2 leading-4" color="medium">Films visionnés</ion-text>
          <ion-text class="text-xl mt-1 font-semibold" color="dark">{{ useUserStore().movieWatched }}</ion-text>
        </ion-card>
      </div>

<!--      todo ajouter des balises pour dire "visionné le" et "tarif de la séance" -->
      <MovieList
          :movies="useUserStore().movieWatchedThisMonth"
          button
          class="ion-margin-horizontal"
          no-data-message="Aucun film ce mois-ci"
          title="Ce mois-ci"
          type="watched"
          @on-view-all="$router.push('/movies/watched')"
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