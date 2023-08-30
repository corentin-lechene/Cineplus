<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user";
import {IonCard, IonText, IonIcon} from "@ionic/vue";
import {ellipsisVertical} from "ionicons/icons";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser().then(() => getProfits());
});

function getProfits() {

}


</script>

<template>
  <ion-card class="flex flex-row justify-between items-center rounded-lg m-0 pl-4 py-3 mr-4">
    <div class="flex flex-col gap-y-0.5">
      <ion-text color="dark" class="text-2xl">Rentabilité</ion-text>
      <ion-text color="medium" class="text-xl">
        Estimée à
        <ion-text :color="userStore.profits > 0 ? 'success' : 'danger'">{{ userStore.profits }}</ion-text>
        €
      </ion-text>
    </div>
    <div class="w-10">
      <ion-icon :icon="ellipsisVertical" size="large"></ion-icon>
    </div>
  </ion-card>
</template>

<style scoped>
</style>
