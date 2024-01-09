import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import {config} from "dotenv";

config();

async function buildApplication() {
    try {
        /**
         *
         * @type {"android" | "ios"}
         */
        const platform = process.argv.slice(2).at(0);
        if(!['android', 'ios'].includes(platform)) {
            console.error("Unknown platform");
            process.exit(1);
        }

        await removeFolder(`./dist`);
        await removeFolder(`./${platform}`);

        await runCommand(`ionic build`);
        await runCommand(`npx cap add ${platform}`);
        await runCommand(`npx cap sync ${platform}`);

        // Images
        switch (platform) {
            case "android":
                const folders = [
                    "mipmap-hdpi",
                    "mipmap-mdpi",
                    "mipmap-xhdpi",
                    "mipmap-xxhdpi",
                    "mipmap-xxxhdpi"
                ]
                for (const folder of folders) {
                    await removeFolder(`android/app/src/main/res/${folder}`);
                }
                for (const folder of folders) {
                    await copyFolder(
                        `resources/android/${folder}`,
                        `android/app/src/main/res/${folder}`,
                        {force: true}
                    );
                }
                break;
            case "ios":
                await removeFolder("ios/App/App/Assets.xcassets");
                await copyFolder(
                    "resources/ios/Assets.xcassets",
                    "ios/App/App/Assets.xcassets"
                );
                break;
        }

        await runCommand(`npx cap open ${platform}`);

        console.log('build réussie!');
    } catch (err) {
        console.error('Erreur de construction:', err);
    }
}

/* ---- */
async function removeFolder(folderPath) {
    try {
        await fs.rm(folderPath, { recursive: true });
        console.log(`Dossier "${folderPath}" supprimé avec succès.`);
    } catch (error) {
        console.error(`Erreur lors de la suppression du dossier "${folderPath}": ${error.message}`);
    }
}

async function copyFolder(source, destination, options) {
    try {
        await fs.cp(source, destination, {
            recursive: true,
            force: options?.force || false }
        );
        console.log(`Dossier "${source}" copié avec succès.`);
    } catch(e) {
        console.error(e);
    }
}
function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la commande: ${error}`);
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

buildApplication().catch();
