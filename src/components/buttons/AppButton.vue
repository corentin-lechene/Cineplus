<template>
  <button
    class="w-full"
    :class="classes"
    :style="style"
    :disabled="disabled || false"
    @click="emit('onTap')"
  >
    <ion-text :color="color">{{text}}</ion-text>
  </button>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {IonText} from "@ionic/vue";

type colors = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark" | "white";

interface AppButtonProps {
  color: colors;
  text: string;
  bgColor?: colors;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  borderRadius?: "sm" | "md" | "lg" | "xl";
  dense?: boolean;
  disabled?: boolean;
}

const props = defineProps<AppButtonProps>();
const emit = defineEmits(["onTap"]);


/* computed */
const style = computed(() => {
  const borderSize = {
    sm: "5px",
    md: "7px",
    lg: "10px",
    xl: "12px"
  };
  const fontSize = {
    xs: "13px",
    sm: "15px",
    md: "18px",
    lg: "22px",
    xl: "25px"
  }
  return {
    backgroundColor: `var(--ion-color-${props?.bgColor || "primary"})`,
    color: `var(--ion-color-${props.color})`,
    borderRadius: props?.dense ? borderSize['md'] : borderSize[props?.borderRadius || "lg"],
    fontSize: props?.dense ? fontSize['xs'] : fontSize[props?.fontSize || "md"],
    padding: props?.dense ? '0.50em 0' : '0.70em 0',
  }
});
const classes = computed(() => {
  return [
    `text-${props.fontSize || "md"}`,
  ]
});

</script>

<style scoped>
  ion-button {
    --ion-color-danger: true;
  }
</style>