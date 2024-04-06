<script lang="ts" setup>

import {IonItem, IonModal, IonText} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseContent from "@/components/common/BaseContent.vue";
import {computed, onMounted, ref} from "vue";
import {Subscription, WatchedMovie} from "@/models";
import {useRoute} from "vue-router";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import dayjs from "@/configs/dayjs.config";
import BaseList from "@/components/ui/BaseList.vue";
import SubscriptionSave from "@/components/subscriptions/SubscriptionSave.vue";
import {ToastService} from "@/services/toast.service";
import MovieWatchedListItem from "@/components/movie/MovieWatchedListItem.vue";

const userStore = useUserStore();

const subscription = ref<Subscription>();
const openSubscriptionEdit = ref(false);

const watchedMovies = computed(() => {
  if (!userStore.user || !subscription.value) return [];
  return userStore.user.watchedMovies.filter(watchedMovie =>
      watchedMovie.subscription && watchedMovie.subscription.id === subscription.value?.id
  );
});
const name = computed(() => {
  if (!subscription.value) return "";
  if(subscription.value?.name === "ugc_illimite") return "UGC Illimité";
  if(subscription.value?.name === "ugc_illimite_26") return "UGC Illimité -26 ans";
  if(subscription.value?.name === "ugc_illimite_duo") return "UGC Illimité Duo";
  return "";
});
const subscriptionMonth = computed(() => {
  if (!subscription.value) return 0;
  const startAt = dayjs(subscription.value.startAt);
  const endAt = dayjs(subscription.value.endAt);
  console.log("(getProfitBySub) startAt: ", startAt.format('LLLL'), " -> ", endAt.format('LLLL'));

  const diff = Math.ceil(endAt.diff(startAt, 'month', true));
  console.log("diff: ", diff)
  return diff;
});

onMounted(() => {
  const subscriptionId = useRoute().params['subscription_id'] as string;
  const loyaltyCardId = useRoute().params['loyalty_card_id'] as string;
  if (!subscriptionId || !userStore.user) return router.back();

  const loyaltyCard = userStore.user.loyaltyCards.find(lc => lc.id === parseInt(loyaltyCardId));
  if (!loyaltyCard) return router.back();

  subscription.value = loyaltyCard.subscriptions.find(sub => sub.id === parseInt(subscriptionId));
});

const movieWatchedBySubscriptionId = (subscriptionId: number) => {
  return watchedMovies.value.filter(wm => wm.subscription?.id === subscriptionId).length;
}

function editSubscription(editSubscription: Subscription) {
  if (!userStore.user || !subscription) return;
  try {
    userStore.updateSubscription(editSubscription);
    ToastService.success("Abonnement modifié");
    openSubscriptionEdit.value = false;
    subscription.value = editSubscription;
  } catch(e) {
      console.error(e);
      ToastService.error("Erreur lors de la modification de l'abonnement");
  }
}

function redirectAddMovieToSubscription() {
  if (!subscription.value) return;
  router.push(`/movies/watched/new?subscription_id=${subscription.value.id}&reset=true`);
}
</script>

<template>
  <ion-page>
    <BaseHeader v-once title="Détail de l'abonnement"/>
    <BaseContent v-once class="ion-padding">
      <div v-if="!subscription || !userStore.user">Loading...</div>
      <div v-else>

        <div>
          <ion-item class="rounded-t-xl" lines="full" @click="openSubscriptionEdit = true">
            <img
                slot="start"
                alt="movie-image"
                class="w-24 h-16 bg-gray-200 rounded-md"
                src="@/assets/images/ugc_illimite.png"
            />
            <div class="flex items-start h-full py-2">
              <div class="flex flex-col relative" style="max-width: 15em">
                <ion-text class="text-xl whitespace-nowrap">{{ name }}</ion-text>
                <ion-text class="text-sm" color="medium">
                  {{ subscriptionMonth }} mois d'abonnement{{ subscriptionMonth > 1 ? 's' : '' }}
                </ion-text>
                <ion-text class="text-sm" color="medium">
                  Abonnement de {{subscription.price}}€ / {{subscription.payment === 'yearly' ? "An" : "Mois"}}
                </ion-text>
              </div>
            </div>
          </ion-item>
          <div class="flex justify-around py-4 rounded-b-xl" style="background: white">
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">{{ movieWatchedBySubscriptionId(subscription.id) }}</ion-text>
              <ion-text class="text-sm leading-3">Séances</ion-text>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">{{ userStore.getProfitBySubscription(subscription).toFixed(2) }} €</ion-text>
              <ion-text class="text-sm leading-3">Béféfices</ion-text>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">{{ userStore.getExtraExpenseBySubscription(subscription).toFixed(2) }} €</ion-text>
              <ion-text class="text-sm leading-3">Dépenses</ion-text>
            </div>
          </div>
        </div>

        <BaseList v-once :items="watchedMovies" addButton class="mt-2" title="Tous les films"
                  @on-add-button="redirectAddMovieToSubscription()">
          <template #default="{item: watchMovie}: {item: WatchedMovie}">
            <MovieWatchedListItem v-once :watched-movie="watchMovie" thumbnail type="watched"
                           @click="$router.push(`/movies/${watchMovie.movie.id}/details`)"/>
          </template>
        </BaseList>

        <ion-modal
            :breakpoints="[0, 1]"
            :initial-breakpoint="1"
            :is-open="openSubscriptionEdit"
            @didDismiss="openSubscriptionEdit = false"
        >
          <SubscriptionSave :subscription="subscription" @onSave="editSubscription($event)"/>
        </ion-modal>
      </div>
    </BaseContent>
  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}
</style>