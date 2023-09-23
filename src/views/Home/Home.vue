<script setup lang="ts">
import {IonContent, IonPage, IonCol, IonGrid} from "@ionic/vue";
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import WatchlistSlides from "@/components/slides/WatchlistSlides.vue";
import ViewedMoviesSlides from "@/components/slides/ViewedMoviesSlides.vue";
import Profits from "@/components/cards/Profits.vue";


</script>

<template>
  <ion-page>

    <HomeHeader/>

    <ion-content class="ion-padding-horizontal">

      <WatchlistSlides/>

      <Profits />

      <ViewedMoviesSlides/>

    </ion-content>
  </ion-page>
</template>