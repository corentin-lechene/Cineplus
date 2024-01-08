import {LoyaltyCard, Subscription} from "@/models";

export class SubscriptionActions {
    static attachSubscription(subscription: Subscription, loyaltyCard: LoyaltyCard) {
        const index = loyaltyCard.subscriptions.findIndex(sub => sub.id === subscription.id);
        if (index === -1) {
            loyaltyCard.subscriptions.push(subscription);
        } else {
            loyaltyCard.subscriptions[index] = subscription;
        }
    }
}