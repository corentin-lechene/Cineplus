<script lang="ts" setup>

import {IonButton, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonNote} from "@ionic/vue";
import {add} from "ionicons/icons";

interface BaseListProps {
  items: any[];
  title?: string;
  section?: boolean,
  noDataMessage?: string;
  button?: boolean;
  addButton?: boolean;
}

const props = defineProps<BaseListProps>();
defineEmits(['onClick', 'viewAll', 'onAddButton']);
defineSlots<{ default(props: { item: any, index: number }): any, header(props: {}): void }>();

</script>

<template>
  <ion-list v-if="section" :inset="false" class="ion-no-margin drop-shadow-card">
    <ion-item-group>
      <ion-item-divider>
        <ion-label>{{ title }}</ion-label>
      </ion-item-divider>

      <div v-if="items?.length === 0">
        <ion-note class="ion-padding-horizontal">{{ noDataMessage || 'Liste de vide' }}</ion-note>
      </div>
      <div v-for="(item, i) in items" :key="i" class="h-auto">
        <slot :index="i" :item="item" name="default"></slot>
      </div>
    </ion-item-group>

  </ion-list>
  <div v-else>
    <ion-list-header v-if="title" class="pl-0">
      <ion-label>{{ title }}</ion-label>
      <ion-button v-if="addButton" @click="$emit('onAddButton')">
        <ion-icon slot="icon-only" :icon="add" color="dark"></ion-icon>
      </ion-button>
      <ion-button v-else-if="button" @click="$emit('viewAll')">Voir tout</ion-button>
    </ion-list-header>
    <ion-list class="drop-shadow-card bg-inherit" inset style="margin-top: 0 !important;">
      <ion-note v-if="items?.length === 0" class="ion-padding-horizontal">{{ noDataMessage || 'Liste vide' }}</ion-note>
      <slot v-for="(item, i) in items" :index="i" :item="item"></slot>
    </ion-list>
  </div>
</template>

<style scoped>
ion-button::part(native) {
  padding: 0;
}
ion-list {
  -webkit-margin-start: 0 !important;
  -webkit-margin-end: 0 !important;
}
</style>