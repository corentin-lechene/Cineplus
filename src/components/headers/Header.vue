<script setup lang="ts">

import {IonBackButton, IonButtons, IonTitle, IonToolbar} from "@ionic/vue";
import BaseHeader from "@/components/headers/BaseHeader.vue";
import {computed} from "vue";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  defaultHref?: string;
  noText?: boolean;
  text?: string;
}

const props = defineProps<HeaderProps>();

const builtText = computed(() => {
  if (!props.noText) return 'Retour';
  return props.text || '';
})

</script>

<template>
  <BaseHeader>
    <ion-toolbar v-if="$slots.default">
      <slot name="default"></slot>
    </ion-toolbar>
    <ion-toolbar v-else>
      <ion-buttons v-if="backButton" slot="start">
        <ion-back-button :text="builtText" :defaultHref="defaultHref"/>
      </ion-buttons>
      <ion-title
          color="dark"
          class="text-2xl font-medium px-2"
          :class="{'text-center': !backButton}"
      >
        {{ title }}
      </ion-title>
    </ion-toolbar>
  </BaseHeader>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>