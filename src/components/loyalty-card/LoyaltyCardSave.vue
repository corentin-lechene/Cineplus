<script lang="ts" setup>

import {IonButton, IonCheckbox, IonImg, IonInput, IonItem, IonList} from "@ionic/vue";
import {onMounted, ref} from "vue";
import BaseSlide from "@/components/slides/BaseSlide.vue";
import {LoyaltyCard} from "@/models";

const firstname = ref("");
const lastname = ref("");
const cardNumber = ref("");
const imageName = ref("ugc_illimite");
const ugc = ref(true)

const props = defineProps<{ loyaltyCard?: LoyaltyCard }>()
const emits = defineEmits(['onSave'])

onMounted(() => {
  if (props.loyaltyCard) {
    firstname.value = props.loyaltyCard.firstname;
    lastname.value = props.loyaltyCard.lastname;
    cardNumber.value = props.loyaltyCard.cardNumber || "";
    imageName.value = props.loyaltyCard.imageUrl;
  }
})


function onSave() {
  emits('onSave', {
    firstname: firstname.value,
    lastname: lastname.value,
    cardNumber: cardNumber.value,
    ugc: ugc.value,
    imageName: imageName.value
  })
}
</script>

<template>
  <div class="ion-padding-horizontal py-8" style="background-color: var(--ion-color-light)">
    <div class="flex gap-x-2 justify-between mb-4">
      <ion-item class="rounded-xl w-full" lines="none">
        <ion-img
            slot="start"
            alt="ugc-logo"
            class="w-16 h-10 mr-0"
            src="https://upload.wikimedia.org/wikipedia/fr/f/f8/Logo_UGC_2018.svg"
        ></ion-img>
        <div class="py-4 ml-2">UGC</div>
        <ion-checkbox slot="end" v-model="ugc" disabled></ion-checkbox>
      </ion-item>
      <!--        <ion-item class="rounded-xl w-full" lines="none">-->
      <!--          <ion-img-->
      <!--              slot="start"-->
      <!--              alt="ugc-logo"-->
      <!--              class="w-16 h-10 mr-0"-->
      <!--              src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f8/Path%C3%A9_Logo.svg/120px-Path%C3%A9_Logo.svg.png?20140312202547"-->
      <!--          ></ion-img>-->
      <!--          <div class="py-4 ml-2">Pathé</div>-->
      <!--          <ion-checkbox disabled slot="end"></ion-checkbox>-->
      <!--        </ion-item>-->
    </div>

    <ion-list class="mb-4 rounded-xl drop-shadow-card">
      <ion-item>
        <ion-input v-model="firstname" label="Prénom"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input v-model="lastname" label="Nom"></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-input v-model="cardNumber" label="N° de carte"></ion-input>
      </ion-item>
    </ion-list>

    <BaseSlide
        v-model="imageName"
        :centeredSlides="true"
        :initialSlide="0"
        :items="['ugc_illimite', 'ugc_illimite_26']"
        :slidesPerView="1.15"
        :space-between="10"
        class="mb-4">
      <template #default="{item}: {item: string}">
        <img v-if="item === 'ugc_illimite'" alt="sub-img" src="@/assets/images/ugc_illimite.png"/>
        <img v-else-if="item === 'ugc_illimite_26'" alt="sub-img" src="@/assets/images/ugc_illimite_26.png"/>
      </template>
    </BaseSlide>

    <ion-button
        class="h-8 w-full"
        shape="round"
        size="small"
        @click="onSave()"
    >
      Enregistrer
    </ion-button>
  </div>
</template>

<style scoped>

</style>