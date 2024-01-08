<script lang="ts" setup>

import {IonImg, IonItem, IonItemOptions, IonItemSliding, IonText} from "@ionic/vue";
import {Cinema} from "@/models";

interface CinemaListItemProps {
  cinema: Cinema,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
}

const props = withDefaults(defineProps<CinemaListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
});

defineEmits(['onClick'])

</script>

<template>
  <ion-item-sliding :disabled="props.disabled || !props.slider">
    <ion-item
        :button="props.clickable"
        :disabled="props.disabled"
        :lines="props.line"
        @click="$emit('onClick', cinema)"
    >
      <ion-img
          src="https://upload.wikimedia.org/wikipedia/fr/f/f8/Logo_UGC_2018.svg"
          class="w-16 h-12 bg-gray-200 rounded-md"
          alt="movie-image"
          slot="start"
          style=" "
      ></ion-img>
      <div class="flex items-start h-full">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 10em">
          <ion-text class="whitespace-nowrap">{{ cinema.name }}</ion-text>
          <ion-text color="medium" style="font-size: 0.95em">{{ props.cinema.address }}</ion-text>
        </div>
      </div>
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