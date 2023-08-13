<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import WatchlistSlides from "@/components/slides/WatchlistSlides.vue";
import ViewedMoviesSlides from "@/components/slides/ViewedMoviesSlides.vue";


</script>

<template>
  <ion-page>

    <HomeHeader />
    
    <ion-content>

      <div class="flex flex-col gap-y-5 pl-4">
        <WatchlistSlides />

        <ViewedMoviesSlides />
      </div>

    </ion-content>
  </ion-page>
</template>