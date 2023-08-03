import {StorageKey, StorageService} from "@/services/storage.service";
import {User} from "@/models";

export class UserService {
    static async getUser(): Promise<User | null> {
        return StorageService.get<User>(StorageKey.USER);
    }

    static async saveUser(user: User): Promise<User | null> {
        return StorageService.save<User>(StorageKey.USER, user);
    }
}