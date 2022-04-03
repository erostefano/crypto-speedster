import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import {config, url} from "./env"

admin.initializeApp();

exports.scheduledCryptoListingsDownload = functions.pubsub.schedule("0 0 * * *")
    .onRun(async () => {
        try {
            const response = await axios.get(url, config);
            const bucket = await admin.storage().bucket();
            const file = bucket.file(new Date().toISOString());
            await file.save(JSON.stringify(response.data.data));
        } catch (e) {
            functions.logger.error(e);
        }

        return null;
    });
