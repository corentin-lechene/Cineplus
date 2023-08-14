<script setup lang="ts">

import {InputCustomEvent, IonInput, IonText} from "@ionic/vue";
import {computed, ref} from "vue";
import dayjs from "@/configs/dayjs.config";

type TypeFields = 'price' | 'text' | 'number' | 'date';
type TextFieldTypes =
    | 'date'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'time'
    | 'week'
    | 'month'
    | 'datetime-local';

interface BaseInputProps {
  modelValue: any;
  type: TypeFields;
  label?: string;
  mask?: string;
  placeholder: string;
  required?: boolean;
  afterNow?: boolean;
}

const props = defineProps<BaseInputProps>();
const emit = defineEmits(['update:modelValue']);

const error = ref("");

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

const builtType = computed<TextFieldTypes>(() => {
  const types = {
    price: 'number',
    number: 'number',
    date: 'date',
    text: 'text',
  };
  return types[props.type] as TextFieldTypes;
});

const builtMask = computed<string>(() => {
  const masks = {
    price: '#.##',
    number: '#.##',
    date: '##/##/####',
    text: '',
  };
  return masks[props.type];
});

function checkValue(e: InputCustomEvent) {
  error.value = "";
  const value = e.detail.value;

  if (props.required && !value) {
    error.value = "Ce champ est requis";
    return;
  }

  if(props.type === 'price' && parseFloat(value || "0") < 0) {
    error.value = "Le prix ne peut pas être négatif";
    return;
  }

  if(props.type === 'date' && props.afterNow && dayjs(value).isBefore(dayjs())) {
    error.value = "La date ne peut pas être dans le passé";
    return;
  }
}

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
        :placeholder="placeholder"
        :type="builtType"
        :required="required"
        @ionChange="checkValue($event)"
        @ionInput="checkValue($event)"
      />
      <ion-text v-if="error" color="danger" class="text-sm pl-1">{{ error }}</ion-text>
    </div>
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