<script setup lang="ts">

import {IonHeader, IonToolbar} from "@ionic/vue";

</script>

<template>
  <ion-header class="ion-padding">
    <ion-toolbar>
      <slot></slot>
    </ion-toolbar>
  </ion-header>
</template>