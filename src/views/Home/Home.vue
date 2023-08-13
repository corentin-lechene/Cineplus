<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import WatchlistSlides from "@/components/slides/WatchlistSlides.vue";


</script>

<template>
  <ion-page>

    <HomeHeader />
    
    <ion-content>

      <div class="pl-4">
        <WatchlistSlides />
      </div>

    </ion-content>
  </ion-page>
</template>