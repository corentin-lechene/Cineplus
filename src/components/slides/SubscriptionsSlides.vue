<script lang="ts" setup>

import {computed, onMounted} from "vue";
import {Swiper as SwiperClass} from "swiper/types";
import subscriptionsData from "@/data/subscriptions.json";
import 'swiper/css';
import SubscriptionImage from "@/components/SubscriptionImage.vue";
import BaseSlide from "@/components/slides/BaseSlide.vue";
import {Subscription} from "@/models";


const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

onMounted(() => {
  console.log("subscriptionsData: ", subscriptionsData);
  value.value = subscriptionsData[0];
})

function onSwiperChange(e: SwiperClass) {
  value.value = subscriptionsData[e.activeIndex];
}

</script>

<template>
<BaseSlide
    v-model="value"
    :items="subscriptionsData"
    :slidesPerView="1.15"
    :initialSlide="1"
    :centeredSlides="true"
    :space-between="10"
    @slideChange="onSwiperChange"
  >
    <template #default="{item}: {item: Subscription}">
      <SubscriptionImage :subscription="item"/>
    </template>
  </BaseSlide>
</template>