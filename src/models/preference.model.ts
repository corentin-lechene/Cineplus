export interface Notification {
    name: string;
    enable: boolean;
    required: boolean;
}

export class Preferences {
    language: 'fr' | 'en';
    darkMode: 'auto' | boolean;
    notifications: Notification[];
    advertisement: string | boolean;


    private constructor(language: "fr" | "en", darkMode: "auto" | boolean, notifications: Notification[], advertisement: string | boolean) {
        this.language = language;
        this.darkMode = darkMode;
        this.notifications = notifications;
        this.advertisement = advertisement;
    }

    static of() {
        return new Preferences("fr", false, [], false);
    }
}