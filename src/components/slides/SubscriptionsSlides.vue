<script lang="ts" setup>

import {computed, onMounted} from "vue";
import {IonCard} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Swiper as SwiperClass} from "swiper/types";
import subscriptionsData from "@/data/subscriptions.json";
import 'swiper/css';
import SubscriptionImage from "@/components/SubscriptionImage.vue";


const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

onMounted(() => {
  value.value = subscriptionsData[0];
})

function onSwiperChange(e: SwiperClass) {
  value.value = subscriptionsData[e.activeIndex];
}

</script>

<template>
  <Swiper
    :slides-per-view="1.15"
    allow-touch-move
    @slideChange="onSwiperChange"
  >
    <SwiperSlide v-for="sub in subscriptionsData">
      <ion-card class="flex flex-col items-center shadow-none gap-y-1">
        <SubscriptionImage :imageUrl="sub.imageUrl" />
        <span class="text-xl">{{ sub.name }}</span>
      </ion-card>
    </SwiperSlide>
  </Swiper>
</template>