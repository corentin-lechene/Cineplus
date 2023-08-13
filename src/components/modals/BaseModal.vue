<script setup lang="ts">
import {IonModal} from "@ionic/vue";
import {computed} from "vue";

interface BaseModalProps {
  modelValue: boolean;
}

const props = defineProps<BaseModalProps>();
const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

function onDismiss() {
  modelValue.value = false;
}

</script>

<template>
  <ion-modal
    :is-open="modelValue"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    @didDismiss="onDismiss"
  >
    <slot name="default"></slot>
  </ion-modal>
</template>

<style scoped>

</style>