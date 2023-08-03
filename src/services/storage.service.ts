import {Storage} from "@ionic/storage";

export enum StorageKey {
    USER = 'user',
}

export class StorageService {
    static async get<T>(key: StorageKey): Promise<T | null> {
        const storage = await StorageService.init();
        const data = await storage.get(key);
        return JSON.parse(data) as T;
    }

    static async save<T>(key: StorageKey, value: any): Promise<T> {
        const storage = await StorageService.init();
        const data = await storage.set(key, JSON.stringify(value));
        return JSON.parse(data) as T;
    }

    protected static async init() {
        return (new Storage()).create();
    }
}