<script setup lang="ts">
import {IonCard, IonCardContent, IonLabel} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {onMounted, ref} from "vue";
import AppButton from "@/components/buttons/AppButton.vue";

onMounted(async () => {

})

</script>

<template>
  <ion-label color="dark" class="text-2xl px-4">Ma List</ion-label>
  <Swiper >
    <SwiperSlide v-for="movie in [{backdropUrl: '', id: ''}]">
      <ion-card color="tertiary" class="py-1">
        <ion-card-content class="flex justify-center relative">
          <img
              class="rounded-lg"
              src="https://image.tmdb.org/t/p/w400/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg"
              alt="img"
              @click="$router.push(`movies/${movie.id}`)"
          >
          <AppButton
              class="absolute w-3/6 bottom-1 shadow-lg"
              color="dark"
              text="Détail du film"
              dense
          />
        </ion-card-content>
      </ion-card>
    </SwiperSlide>
  </Swiper>
</template>