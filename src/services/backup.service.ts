import {Backup, User} from "@/models";
import {initializeApp} from "firebase/app";
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import dayjsConfig from "@/configs/dayjs.config";


export class BackupService {
    static firebaseApp() {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_FIREBASE_APP_ID
        };
        return initializeApp(firebaseConfig);
    }

    static async fetchBackups(userId: number): Promise<Backup[]> {
        const app = this.firebaseApp();
        const db = getFirestore(app)
        const backupRef = collection(db, `users/${userId}/backups`);
        const snapshot = await getDocs(backupRef);
        return snapshot.docs
            .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    type: data.type,
                    createdAt: data.createdAt.toDate(),
                    data: data.data,
                } as Backup;
            })
            .sort((a, b) => dayjsConfig(b.createdAt).unix() - dayjsConfig(a.createdAt).unix());
    }

    static async save(backup: Partial<Backup>, user: User): Promise<Backup> {
        const app = this.firebaseApp();
        const db = getFirestore(app);
        const backupRef = collection(db, `users/${user.id}/backups`);
        const backupDoc = doc(backupRef);

        const backupToSave = {
            type: backup.type,
            createdAt: backup.createdAt,
            data: {
                user: JSON.stringify(user)
            }
        };

        // avoid duplication in same minute
        const backups = await this.fetchBackups(user.id);
        const lastBackup = backups[backups.length - 1];
        if (lastBackup && dayjsConfig(lastBackup.createdAt).isSame(dayjsConfig(backup.createdAt), 'minute')) {
            console.log("avoid")
            return lastBackup;
        }

        console.log("save to cloud")
        // save backup
        await setDoc(backupDoc, backupToSave);
        return {
            id: backupDoc.id,
            type: backup.type,
            createdAt: backup.createdAt,
            data: {
                user: JSON.stringify(user)
            }
        } as Backup
    }
}