import {LoyaltyCard, Subscription, User} from "@/models";
import dayjs from "@/configs/dayjs.config";

export class SubscriptionActions {
    static attachSubscription(subscription: Subscription, loyaltyCard: LoyaltyCard) {
        const index = loyaltyCard.subscriptions.findIndex(sub => sub.id === subscription.id);
        if (index === -1) {
            loyaltyCard.subscriptions.push(subscription);
        } else {
            loyaltyCard.subscriptions[index] = subscription;
        }
    }

    static update(subscription: Subscription, user: User) {
        for (let i = 0; i < user.loyaltyCards.length; i++) {
            for (let j = 0; j < user.loyaltyCards[i].subscriptions.length; j++) {
                if (user.loyaltyCards[i].subscriptions[j].id === subscription.id) {
                    user.loyaltyCards[i].subscriptions[j] = subscription;
                }
            }
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

    static getProfitBySubscription(user: User, subscription: Subscription) {
        if(!user) return 0;
        const startAt = dayjs(subscription.startAt);
        const endAt = dayjs(subscription.endAt);
        // console.log("(getProfitBySub) startAt: ", startAt.format('LLLL'), " -> ", endAt.format('LLLL'));

        const diff = Math.ceil(endAt.diff(startAt, 'month', true));
        // console.log("diff: ", diff)

        const watchedMovies = user.watchedMovies
            .filter(watchedMovie => !!watchedMovie.subscription && watchedMovie.subscription.id === subscription.id);
        // console.log("watchedMovies: ", watchedMovies.length);

        for (const watchedMovie of watchedMovies) {
            // console.log(watchedMovie.ticketPrice)
        }
        const totalTicketPrice = watchedMovies.reduce((acc, watchedMovie) => acc + (watchedMovie.ticketPrice || 0.0), 0.0);
        // console.log("totalTicketPrice: ", totalTicketPrice);

        const subscriptionPrice = subscription.payment === "monthly"
            ? subscription.price * diff
            : (subscription.price) * diff;
        // console.log("subscriptionPrice: ", subscriptionPrice);

        const profit = (totalTicketPrice - subscriptionPrice);
        // console.log("profit: ", profit);
        return profit
    }

    static getTicketEarnedBySubscription(user: User, subscription: Subscription) {
        if(!user) return 0;

        const sumTicketPrice = user.watchedMovies
            .filter(watchedMovie => !!watchedMovie.subscription && watchedMovie.subscription.id === subscription.id)
            .reduce((acc, watchedMovie) => acc + (watchedMovie.ticketPrice || 0.0), 0.0);

        const profit = SubscriptionActions.getProfitBySubscription(user, subscription);
        const extraExpense = SubscriptionActions.getExtraExpenseBySubscription(user, subscription);
        const ticketEarned = (profit - extraExpense) / sumTicketPrice;

        if(isNaN(ticketEarned)) return 0;
        return Math.floor(ticketEarned);
    }

    static getExtraExpenseBySubscription(user: User, subscription: Subscription) {
        if(!user) return 0;
        const watchedMovies = user.watchedMovies
            .filter(watchedMovie => !!watchedMovie.subscription && watchedMovie.subscription.id === subscription.id);
        return watchedMovies.reduce((acc, watchedMovie) => acc + (watchedMovie.extraExpense || 0.0), 0.0)
    }
}