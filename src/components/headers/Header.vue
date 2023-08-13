<script setup lang="ts">

import {IonBackButton, IonButtons, IonTitle, IonToolbar} from "@ionic/vue";
import BaseHeader from "@/components/headers/BaseHeader.vue";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  defaultHref?: string;
}

const props = defineProps<HeaderProps>();


</script>

<template>
  <BaseHeader>
    <ion-toolbar>
      <ion-buttons v-if="backButton" slot="start">
        <ion-back-button text="Retour" :defaultHref="defaultHref" />
      </ion-buttons>
      <ion-title color="dark" class="text-2xl font-medium">{{ title }}</ion-title>
    </ion-toolbar>
  </BaseHeader>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>