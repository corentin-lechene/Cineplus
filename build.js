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

        switch (platform) {
            case "android":

                break;
            case "ios":
                await copyImage(
                    "resources/logo.png",
                    "ios/App/App/Assets.xcassets/AppIcon.appiconset/logo.png"
                );
                await useImage(
                    "logo.png",
                    "ios/App/App/Assets.xcassets/AppIcon.appiconset/Contents.json"
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
async function useImage(imageName, filePath) {
    try {
        // Lire le contenu du fichier JSON
        const jsonString = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(jsonString);

        // Mettre à jour le nom du fichier
        jsonData.images[0].filename = imageName;

        // Convertir l'objet mis à jour en chaîne JSON
        const updatedJsonString = JSON.stringify(jsonData, null, 2);

        await fs.writeFile(filePath, updatedJsonString, 'utf-8');

        console.log('Le nom du fichier a été mis à jour avec succès.');
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du fichier JSON : ${error.message}`);
    }
}
async function copyImage(sourcePath, destinationPath) {
    try {
        await fs.copyFile(sourcePath, destinationPath);
        console.log('Image copiée avec succès.');
    } catch (err) {
        console.error('Erreur lors de la copie de l\'image:', err.message);
    }
}
async function removeFolder(folderPath) {
    try {
        await fs.rm(folderPath, { recursive: true });
        console.log(`Dossier "${folderPath}" supprimé avec succès.`);
    } catch (error) {
        console.error(`Erreur lors de la suppression du dossier "${folderPath}": ${error.message}`);
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
