<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import MyList from "@/components/MyList.vue";
import ViewedMovies from "@/components/ViewedMovies.vue";

</script>

<template>
  <ion-page>

    <HomeHeader />
    
    <ion-content>

      <MyList />

      <ViewedMovies />

    </ion-content>
  </ion-page>
</template>