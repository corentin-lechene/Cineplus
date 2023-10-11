<script setup lang="ts">

import {IonHeader} from "@ionic/vue";

interface BaseHeaderProps {
  noPadding?: boolean;
}

const props = defineProps<BaseHeaderProps>();

</script>

<template>
  <ion-header :class="{'ion-padding-vertical': !props.noPadding}">
    <slot></slot>
  </ion-header>
</template>