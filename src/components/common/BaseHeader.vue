<script lang="ts" setup>
import {IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/vue";
import {add, arrowBack, checkmark, close} from "ionicons/icons";

withDefaults(defineProps<{
  arrowBackButton?: boolean,
  closeButton?: boolean,
  addButton?: boolean,
  addButtonColor?: "gray" | "amber",
  title: string,
}>(), {
  addButtonColor: 'gray'
});

defineEmits(['onAdd'])
</script>

<template>
  <ion-header class="ion-no-border">
    <ion-toolbar class="h-auto">
      <div class="flex justify-between py-4 px-2">
        <ion-buttons slot="start">
          <ion-icon v-if="!arrowBackButton" :icon="arrowBack" class="text-2xl rounded-full bg-gray-200 p-1"
                    @click="$router.back"></ion-icon>
        </ion-buttons>
        <ion-title class="text-xl p-0">{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-icon v-if="closeButton" :icon="close" class="text-2xl rounded-full bg-gray-200 p-1"></ion-icon>
          <ion-icon v-if="addButton" :icon="addButtonColor === 'gray' ? add : checkmark" :class="`bg-${addButtonColor}-200`" class="text-2xl rounded-full p-1"
                    @click="$emit('onAdd')"></ion-icon>
        </ion-buttons>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>

</style>