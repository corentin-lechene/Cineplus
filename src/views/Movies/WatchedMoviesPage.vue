<script lang="ts" setup>

import {IonContent} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue"
import MovieList from "@/components/movie/MovieList.vue";
import {useUserStore} from "@/stores/user";
</script>

<template>
<ion-page>
  <BaseHeader title="Films vus" />
  <ion-content class="ion-padding-horizontal">
    <MovieList :movies="useUserStore().movieWatchedThisMonth" title="Tous les films vus" type="watched" />
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>