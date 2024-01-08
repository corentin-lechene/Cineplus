<script setup lang="ts">

import {IonLabel, IonList, IonListHeader,} from "@ionic/vue";


interface BaseListProps {
  title?: string;
}

const props = defineProps<BaseListProps>();
const emits = defineEmits(['onClick']);
const slots = defineSlots();

</script>

<template>
  <ion-list inset class="drop-shadow-card">
    <ion-list-header v-if="$slots.header">
      <slot name="header"></slot>
    </ion-list-header>
    <ion-list-header v-if="props.title && !$slots.header">
      <ion-label class="mt-3">{{ props.title }}</ion-label>
    </ion-list-header>

    <slot name="default"></slot>
  </ion-list>
</template>

<style scoped>
ion-list {
  -webkit-margin-start: 0 !important;
  -webkit-margin-end: 0 !important;
}
</style>