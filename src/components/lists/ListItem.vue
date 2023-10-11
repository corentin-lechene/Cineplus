<script setup lang="ts">

import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonItemSliding,
  IonNote,
  IonToggle
} from "@ionic/vue";
import {computed} from "vue";

interface BaseListItemOptions {
  color?: string;
  icon: string;
  expandable?: boolean;
}

interface ListItemProps {
  label: string;
  value?: string | boolean;
  route?: string;
  icon?: string;
  img?: string;
  clickable?: boolean;
  disabled?: boolean;
  options?: BaseListItemOptions[];
  last?: boolean;
}

const props = defineProps<ListItemProps>();
const emit = defineEmits(['onClick', 'onChange']);


const isValueBoolean = computed(() => typeof props.value === 'boolean');
const isValueString = computed(() => typeof props.value === 'string');

function onClick() {
  if (!props.disabled && props.clickable) {
    emit('onClick', props);
  }
}

function onChange() {
  if (!props.disabled && isValueBoolean.value) {
    emit('onChange', !props.value);
  }
}

</script>

<template>
  <ion-item-sliding :disabled="!props.options?.length || props.disabled">
    <ion-item
        :lines="props.last ? 'none' : 'inset'"
        :button="props.clickable"
        :disabled="props.disabled"
        @click="onClick()"
    >
      <slot v-if="$slots.default" name="default" :item="props"></slot>
      <!-- Icon and image       -->
      <ion-icon v-if="props.icon" slot="start" :icon="props.icon"></ion-icon>
      <ion-avatar v-else-if="props.img" aria-hidden="true" slot="start">
        <img alt="" :src="props.img"/>
      </ion-avatar>

      <!-- Label and value       -->
      <ion-label v-if="props.label">{{ props.label }}</ion-label>
      <ion-note v-if="isValueString" slot="end">{{ props.value }}</ion-note>
      <ion-toggle
          v-else-if="typeof props.value === 'boolean'"
          aria-label="Toggle Dark Mode"
          :checked="props.value"
          :disabled="props.disabled"
          @ion-change="onChange()"
          slot="end"
      ></ion-toggle>


    </ion-item>

    <!-- Options       -->
    <ion-item-options slot="end">
      <ion-item-option
          v-for="(option, i) in props.options"
          :key="i"
          :color="option.color"
          :expandable="option.expandable"
      >
        <ion-icon slot="icon-only" :icon="option.icon"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>