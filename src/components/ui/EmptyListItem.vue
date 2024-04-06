<script lang="ts" setup>

import {IonIcon, IonItem, IonItemOptions, IonItemSliding, IonText,} from "@ionic/vue";

import EmptyImage from "@/components/ui/EmptyImage.vue";
import {add} from "ionicons/icons";

interface EmptyListItemProps {
  label: string,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
  thumbnail?: boolean,
}

const props = withDefaults(defineProps<EmptyListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
  thumbnail: false,
});

</script>

<template>
  <ion-item-sliding :disabled="props.disabled || !props.slider">
    <ion-item
        :button="props.clickable"
        :detail="false"
        :disabled="props.disabled"
        :lines="props.line"
    >
      <EmptyImage
          slot="start"
          :class="{ 'w-16 h-12': props.thumbnail, 'h-32 w-22': !props.thumbnail }"
          :thumbnail="props.thumbnail"
      />
      <div class="flex items-center h-full">
        <ion-text>{{ props.label }}</ion-text>
      </div>
      <ion-icon slot="end" :icon="add" class="text-xl rounded-full bg-gray-200 p-1"></ion-icon>
    </ion-item>
    <ion-item-options>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>
ion-item {
  --padding-start: 0.65em;
  --padding-bottom: 0.5em;
  --padding-top: 0.5em;
}

</style>

