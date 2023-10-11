<script setup lang="ts">

import {IonLabel, IonList, IonListHeader,} from "@ionic/vue";


interface BaseListProps {
  title: string;
}

const props = defineProps<BaseListProps>();
const emits = defineEmits(['onClick']);
const slots = defineSlots();

</script>

<template>
  <ion-list inset>
    <ion-list-header v-if="props.title">
      <ion-label class="mt-3">{{ props.title }}</ion-label>
    </ion-list-header>

    <slot name="default"></slot>
  </ion-list>
</template>