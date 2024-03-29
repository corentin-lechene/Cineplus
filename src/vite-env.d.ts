/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_MOVIE_DB_API: string
    VITE_SUPABASE_URL: string
    VITE_SUPABASE_ANON_KEY: string;

    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
}
