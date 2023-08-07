<script lang="ts" setup>

interface SubscriptionImageProps {
  imageUrl: string;
}

const props = defineProps<SubscriptionImageProps>();

</script>

<template>
  <div>
    <img v-if="imageUrl.startsWith('ugc')" src="@/assets/images/ugc_illimite.png" alt="sub-img"/>
    <img v-if="imageUrl.startsWith('cine')" src="@/assets/images/cine_pass.png" alt="sub-img"/>
  </div>
</template>