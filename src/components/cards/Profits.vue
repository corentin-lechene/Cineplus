<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useUserStore} from "@/stores/user";
import {IonCard, IonText} from "@ionic/vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser().then(() => getProfits());
});

function getProfits() {

}

const profits = computed(() => {
  if(!userStore) return 0;
  if(!userStore.lastSubscription) {
    return userStore.viewedMovies.reduce((acc, vm) => {
      return (vm.extra ?? 0) + acc;
    }, 0)
  }
  return userStore.profits;
});


</script>

<template>
  <ion-card class="mx-0 p-4">
    <ion-card-content class="m-0">
      <ion-text color="dark" class="text-2xl">Rentabilité</ion-text>
      <br>
      <ion-text color="medium" class="text-xl">
        Estimée à
        <ion-text :color="profits >= 0 ? 'success' : 'danger'">{{ profits }}</ion-text>
        €
      </ion-text>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
</style>
