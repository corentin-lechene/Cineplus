<script setup lang="ts">

import {getPlatforms, IonInput, IonText} from "@ionic/vue";
import {computed} from "vue";
import dayjs from "@/configs/dayjs.config";

type TypeFields = 'price' | 'text' | 'number' | 'date';
type colors = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
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
  bgColor?: colors;
  mask?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  debounce?: number;

  afterNow?: boolean;
  beforeDate?: string | null;
  beforeDateErrorMessage?: string;
}

const props = defineProps<BaseInputProps>();
const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

const bgColor = computed(() => `var(--ion-color-${props.bgColor || 'tertiary'})`);
const isIos = computed(() => {
  const platforms = getPlatforms();
  const ios = ["ios", "ipad", "iphone"];
  return platforms.find(p => ios.includes(p));
})

const builtType = computed<TextFieldTypes>(() => {
  const types = {
    price: isIos.value ? 'number' : 'tel',
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

const errorMessage = computed(() => {
  if (props.required && !modelValue.value) {
    return "Ce champ est requis";
  }

  if(props.type === 'price' && parseFloat(modelValue.value || "0") < 0) {
    return "Le prix ne peut pas être négatif";
  }

  if(props.type === 'date' && props.afterNow && dayjs(modelValue.value).isBefore(dayjs(), 'day')) {
    return "La date ne peut pas être dans le passé";
  }

  if(props.type === 'date' && props.beforeDate && dayjs(modelValue.value).isAfter(props.beforeDate)) {
    return props.beforeDateErrorMessage || 'La date ne peut pas être après la date';
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
        :placeholder="placeholder"
        :type="builtType"
        :required="required"
        :disabled="disabled || false"
        :debounce="debounce || 0"
      />
      <ion-text v-if="errorMessage" color="danger" class="text-sm pl-1">{{ errorMessage }}</ion-text>
    </div>
  </div>
</template>

<style scoped>

ion-input {
  --background: v-bind(bgColor);
  --padding-start: 10px;
  --padding-end: 10px;
  --border-radius: 7px;
  border-radius: 7px;
}
</style>