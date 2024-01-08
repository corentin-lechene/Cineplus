<script lang="ts" setup>

import {Cinema} from "@/models";
import BaseList from "@/components/ui/BaseList.vue";
import CinemaListItem from "@/components/cinema/CinemaListItem.vue";
import {ref} from "vue";
import BaseHeader from "@/components/common/BaseHeader.vue";

interface CinemaListProps {
  cinemas: Cinema[];
  title?: string;
  section?: boolean;
}

const localCinemas = ref<Cinema[]>([
  {
    id: 0,
    name: "Rosny-Sous-Bois",
    brand: "UGC",
    ticketPrice: 13.50,
    address: "La rue de Rosny"
  },
  {
    id: 1,
    name: "Noisy-le-grand",
    brand: "UGC",
    ticketPrice: 13.50,
    address: "La rue de noisy"
  },
  {
    id: 2,
    name: "Bercy",
    brand: "UGC",
    ticketPrice: 13.50,
    address: "La rue de bercy"
  }
]);


const props = defineProps<CinemaListProps>();
const emit = defineEmits<{ (e: 'onSelected', cinema: Cinema): Cinema }>();

function onSelectCinema(cinema: Cinema) {
  console.log(cinema);
  emit("onSelected", cinema);
}

</script>

<template>
  <div style="background: var(--ion-color-light)">
    <BaseHeader title="Cinemas" close-button arrow-back-button />
    <BaseList class="ion-padding-horizontal" :items="localCinemas" :section="section" :title="title">
      <template #default="{item}: {item: Cinema}">
        <CinemaListItem :cinema="item" thumbnail @onClick="onSelectCinema" />
      </template>
    </BaseList>
  </div>
</template>

<style scoped>

</style>