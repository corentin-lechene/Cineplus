<script lang="ts" setup>
import {IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/vue";
import {add, arrowBack, checkmark, close} from "ionicons/icons";

withDefaults(defineProps<{
  arrowBackButton?: boolean,
  closeButton?: boolean,
  addButton?: boolean,
  addButtonColor?: "gray" | "amber" | "green",
  title: string,
  rightButton?: string;
  rightButtonColor?: string;
}>(), {
  addButtonColor: 'gray'
});

defineEmits(['onAdd', 'onCloud', 'onClose'])
</script>

<template>
  <ion-header class="ion-no-border" mode="ios">
    <ion-toolbar class="h-auto">
      <div class="flex justify-between py-4 px-2">
        <ion-buttons slot="start">
          <ion-icon v-if="!arrowBackButton" :icon="arrowBack" class="text-2xl rounded-full bg-gray-200 p-1"
                    @click="$router.back"></ion-icon>
        </ion-buttons>
        <ion-title class="text-xl p-0">{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-icon v-if="closeButton" :icon="close" class="text-2xl rounded-full bg-gray-200 p-1"
                    @click="$emit('onClose')"></ion-icon>
          <ion-icon v-if="addButton" :class="addButtonColor === 'gray' ? 'bg-gray-200' : addButtonColor === 'green' ? 'bg-green-500' : 'bg-amber-300'"
                    :icon="addButtonColor === 'gray' ? add : checkmark"
                    class="text-2xl rounded-full p-1"
                    @click="$emit('onAdd')"></ion-icon>
          <ion-icon v-if="rightButton" :class="rightButtonColor" :icon="rightButton" class="text-2xl rounded-full p-1.5"
                    @click="$emit('onCloud')"></ion-icon>
        </ion-buttons>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>

</style>