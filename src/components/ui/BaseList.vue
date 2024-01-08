<script lang="ts" setup>

import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonNote} from "@ionic/vue";

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
    <ion-list-header v-if="title">{{ title }}</ion-list-header>
    <ion-list class="drop-shadow-card" inset style="margin-top: 0 !important;">
      <div v-if="items?.length === 0">
        <ion-note class="ion-padding-horizontal">{{ noDataMessage || 'Liste de vide' }}</ion-note>
      </div>
      <slot v-for="(item, i) in items" :item="item" :index="i"></slot>
    </ion-list>
  </div>
</template>

<style scoped>
ion-list {
  -webkit-margin-start: 0 !important;
  -webkit-margin-end: 0 !important;
}
</style>