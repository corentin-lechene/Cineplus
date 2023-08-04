<template>
  <button
    class="w-full"
    :class="classes"
    :style="style"
    @click="emit('onTap')"
  >{{ text }}
  </button>
</template>

<script setup lang="ts">

import {computed, onUnmounted} from "vue";
type colors = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";

interface AppButtonProps {
  color: colors;
  text: string;
  bgColor?: colors;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  borderRadius?: "sm" | "md" | "lg" | "xl";
  dense?: boolean;
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
    xs: "12px",
    sm: "15px",
    md: "18px",
    lg: "22px",
    xl: "25px"
  }
  console.log(props?.dense)
  return {
    backgroundColor: `var(--ion-color-${props?.bgColor || "primary"})`,
    color: `var(--ion-color-${props.color})`,
    borderRadius: props?.dense ? borderSize['md'] : borderSize[props?.borderRadius || "lg"],
    fontSize: props?.dense ? fontSize['sm'] : fontSize[props?.fontSize || "md"],
    padding: props?.dense ? '0.50em 0' : '1em 0',
  }
});
const classes = computed(() => {
  return [
    `text-${props.fontSize || "md"}`,
  ]
});

</script>

<style scoped>

</style>