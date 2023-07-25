import { Storage } from '@ionic/storage';

export class StorageService {
    static instance = null;

    static getInstance(): Storage {
        if (!StorageService.instance) {
            StorageService.instance = new Storage();
        }
        return StorageService.instance;
    }
}
