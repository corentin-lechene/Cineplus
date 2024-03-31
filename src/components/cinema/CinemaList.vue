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
    name: "Rosny",
    brand: "UGC",
    ticketPrice: 14.60,
    address: "16, rue Conrad Adenauer 93110 ROSNY SOUS BOIS"
  },
  {
    id: 1,
    name: "Noisy-le-grand",
    brand: "UGC",
    ticketPrice: 14.60,
    address: "Centre Commercial Arcades BP200 93193 NOISY-LE-GRAND"
  },
  {
    id: 2,
    name: "Bercy",
    brand: "UGC",
    ticketPrice: 12.90,
    address: "2, cour Saint Emilion 75012 PARIS"
  }
]);


const props = defineProps<CinemaListProps>();
const emit = defineEmits<{ (e: 'onSelected', cinema: Cinema): Cinema }>();

function onSelectCinema(cinema: Cinema) {
  emit("onSelected", cinema);
}

</script>

<template>
  <div style="background: var(--ion-color-light)">
    <BaseHeader arrow-back-button title="Cinemas" />
    <BaseList class="ion-padding-horizontal" :items="localCinemas" :section="section" :title="title">
      <template #default="{item}: {item: Cinema}">
        <CinemaListItem :cinema="item" thumbnail @onClick="onSelectCinema" />
      </template>
    </BaseList>
  </div>
</template>

<style scoped>

</style>