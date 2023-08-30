import {Subscription} from "@/models";
import dayjs from "@/configs/dayjs.config";

export class SubscriptionService {
    static isValid(subscription: Subscription): boolean {
        if(subscription.price <= 0) return false;
        if(subscription.ticketPrice <= 0) return false;
        if(!subscription.startAt || !dayjs(subscription.startAt).isValid()) return false;
        if(subscription.expireAt !== null) {
            if(!dayjs(subscription.expireAt).isValid()) return false;
            if(!dayjs(subscription.startAt).isBefore(subscription.expireAt, 'day')) return false;
        }
        return true;
    }
}