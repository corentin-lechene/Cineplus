<script lang="ts" setup>

import {IonButton, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonNote} from "@ionic/vue";


interface BaseListProps {
  items: any[];
  title?: string;
  section?: boolean,
  noDataMessage?: string;
  button?: boolean;
}

const props = defineProps<BaseListProps>();
defineEmits(['onClick']);
defineSlots<{ default(props: { item: any, index: number }): any, header(props: {}): void }>();

</script>

<template>
  <ion-list v-if="section" :inset="false" class="ion-no-margin">
    <ion-item-group>
      <ion-item-divider>
        <ion-label>Films populaires</ion-label>
      </ion-item-divider>

      <div v-if="items?.length === 0">
        <ion-note class="ion-padding-horizontal">{{ noDataMessage || 'Liste de vide' }}</ion-note>
      </div>
      <div v-for="(item, i) in items" :key="i" class="h-auto">
        <slot :index="i" :item="item" name="default"></slot>
      </div>
    </ion-item-group>

  </ion-list>
  <ion-list v-else :inset="false">
    <ion-list-header v-if="$slots.header">
      <slot name="header"></slot>
    </ion-list-header>
    <ion-list-header v-if="props.title && !$slots.header" color="light">
      <ion-label class="mt-3">{{ props.title }}</ion-label>
      <ion-button v-if="props.button" class="mt-3" fill="clear" @click="$emit('onClick')">
        Voir tout
      </ion-button>
    </ion-list-header>

    <div v-if="items?.length === 0">
      <ion-note class="ion-padding-horizontal">{{ noDataMessage || 'Liste de vide' }}</ion-note>
    </div>
    <div v-for="(item, i) in items" :key="i" class="h-auto">
      <slot :index="i" :item="item" name="default"></slot>
    </div>
  </ion-list>
</template>

<style scoped>
ion-list {
  -webkit-margin-start: 0 !important;
  -webkit-margin-end: 0 !important;
}
</style>