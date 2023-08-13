<script setup lang="ts">

import {IonTextarea, IonText, TextareaCustomEvent} from "@ionic/vue";
import {computed, ref} from "vue";

interface BaseInputProps {
  modelValue: string;
  label?: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  autoGrow?: boolean;
}

const props = defineProps<BaseInputProps>();
const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});
const error = ref("");

function checkValue(event: TextareaCustomEvent) {
  error.value = "";
  const value = event.detail.value as string;

  if(props.required && !value) {
    error.value = "Ce champ est requis";
    return;
  }
}

</script>

<template>
  <div class="flex flex-col gap-y-1">
    <ion-text v-if="label" color="dark" class="text-lg">{{ label }}</ion-text>
    <div class="flex flex-col">
      <ion-textarea
          v-model="modelValue"
          :placeholder="placeholder"
          :required="required"
          @ionInput="checkValue($event)"
          :rows="rows || 3"
          :auto-grow="autoGrow || true"
      />
      <ion-text v-if="error" color="danger" class="text-sm pl-1">{{ error }}</ion-text>
    </div>
  </div>
</template>

<style scoped>
ion-textarea {
  --background: var(--ion-color-tertiary);
  --padding-start: 10px;
  --padding-end: 10px;
  --border-radius: 7px;
  border-radius: 7px;
}
</style>