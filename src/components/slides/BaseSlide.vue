<script setup lang="ts">

import {computed} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Swiper as SwiperClass} from "swiper/types";


interface BaseSlideProps {
  modelValue: any;
  items: any[];
  slidesPerView: number;
  initialSlide?: number;
  centeredSlides?: boolean;
  spaceBetween?: number;
  autoplay?: boolean;
  loop?: boolean;
}

interface BaseSlideEvents<T> {
  'update:modelValue': T;
  'slideChange': SwiperClass;
}


const props = defineProps<BaseSlideProps>();
const emit = defineEmits(['update:modelValue', 'slideChange', 'slideIndexChange']);
const slots = defineSlots<{ default(props: { item: any }): any }>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

function onSlideChange(e: SwiperClass) {
  modelValue.value = props.items[e.activeIndex];
  emit('slideIndexChange', e.activeIndex);
}

</script>

<template>
  <Swiper
      :slides-per-view="props.slidesPerView"
      :initial-slide="props.initialSlide"
      :centered-slides="props.centeredSlides"
      :centered-slides-bounds="props.centeredSlides"
      :space-between="props.spaceBetween"
      :autoplay="props.autoplay"
      :loop="props.autoplay"
      free-mode
      allow-touch-move
      @slideChange="onSlideChange"
  >
    <SwiperSlide v-for="item in items">
      <slot name="default" :item="item"></slot>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>

</style>