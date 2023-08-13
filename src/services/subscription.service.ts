import {Subscription} from "@/models";
import dayjs from "@/configs/dayjs.config";

export class SubscriptionService {
    static isValid(subscription: Subscription): boolean {
        if(subscription.price <= 0) return false;
        if(subscription.ticketPrice <= 0) return false;
        if(!dayjs(subscription.expireAt).isValid()) return false;
        if(dayjs(subscription.expireAt).isBefore(dayjs())) return false;
        return true;
    }
}