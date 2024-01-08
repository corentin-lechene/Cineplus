import {LoyaltyCard, Subscription, User} from "@/models";

export class SubscriptionActions {
    static attachSubscription(subscription: Subscription, loyaltyCard: LoyaltyCard) {
        const index = loyaltyCard.subscriptions.findIndex(sub => sub.id === subscription.id);
        if (index === -1) {
            loyaltyCard.subscriptions.push(subscription);
        } else {
            loyaltyCard.subscriptions[index] = subscription;
        }
    }

    static delete(subscription: Subscription, user: User) {
        for (let i = 0; i < user.loyaltyCards.length; i++) {
            for (let j = 0; j < user.loyaltyCards[i].subscriptions.length; j++) {
                user.loyaltyCards[i].subscriptions = user.loyaltyCards[i].subscriptions
                    .filter(sub => sub.id !== subscription.id);
            }
        }
    }
}