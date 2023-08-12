<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import HomeHeader from "@/views/Home/components/HomeHeader.vue";
import {onMounted} from "vue";
import {MovieService} from "@/services/movie.service";
import dayjs from "@/configs/dayjs.config";

onMounted(() => {
  
})

</script>

<template>
  <ion-page>

    <HomeHeader />
    
    <ion-content>



    </ion-content>
  </ion-page>
</template>