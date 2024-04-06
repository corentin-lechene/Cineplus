import {LoyaltyCard, User} from "@/models";

export class LoyaltyCardActions {

    static createLoyaltyCard(user: User, loyaltyCard: LoyaltyCard) {
        const index = user.loyaltyCards.findIndex(lc => lc.id === loyaltyCard.id);
        if(index === -1) {
            user.loyaltyCards.push(loyaltyCard);
        } else {
            user.loyaltyCards[index] = loyaltyCard;
        }
    }

    static updateLoyaltyCard(user: User, loyaltyCard: LoyaltyCard) {
        const index = user.loyaltyCards.findIndex(lc => lc.id === loyaltyCard.id);
        if(index !== -1) {
            user.loyaltyCards[index] = loyaltyCard;
        }
    }

    static deleteLoyaltyCard(user: User, loyaltyCard: LoyaltyCard) {
        user.loyaltyCards = user.loyaltyCards.filter(lc => lc.id !== loyaltyCard.id);
    }
}