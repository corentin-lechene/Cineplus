<script setup lang="ts">

import {IonDatetime, IonInput, IonText, IonModal} from "@ionic/vue";
import {computed} from "vue";

type TypeFields = 'date' | 'datetime';
type TextFieldTypes = "date-time" | "time-date" | "date" | "time" | "month" | "year" | "month-year";

interface BaseInputProps {
  modelValue: any;
  type: TypeFields;
  label?: string;
  mask?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}

const props = defineProps<BaseInputProps>();
const emit = defineEmits(['update:modelValue']);


const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});


const builtType = computed<TextFieldTypes>(() => {
  const types = {
    date: 'date',
    datetime: 'date-time',
  };
  return types[props.type] as TextFieldTypes;
});


const errorMessage = computed(() => {
  if (props.required && !modelValue.value) {
    return "Ce champ est requis";
  }

  return '';
});

</script>

<template>
  <div class="flex flex-col gap-y-1">
    <slot v-if="$slots.label" name="label"></slot>
    <ion-text v-else-if="label" color="dark" class="text-lg">
      {{ label }}{{required ? ' *' : ''}}
    </ion-text>
    <div class="flex flex-col">
      <ion-input
          v-model="modelValue"
          id="base-date"
          type="search"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled || false"
      />
      <ion-text v-if="errorMessage" color="danger" class="text-sm pl-1">{{ errorMessage }}</ion-text>
    </div>

    <ion-modal trigger="base-date" :keep-contents-mounted="true">
      <ion-datetime
          v-model="modelValue"
          :presentation="builtType"
          mode="ios"
      />
    </ion-modal>
  </div>
</template>

<style scoped>
ion-input {
  --background: var(--ion-color-tertiary);
  --padding-start: 10px;
  --padding-end: 10px;
  --border-radius: 7px;
  border-radius: 7px;
}
</style>