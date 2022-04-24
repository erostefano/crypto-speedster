import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { config, rankKey, url } from './env';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

admin.initializeApp();

exports.scheduledCryptoListingDownload = functions.pubsub
    .schedule('0 0 * * *')
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

exports.getRanking = functions.https.onRequest(async (req, resp) => {
    // TODO: check auth
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', '*');

    const queryDate = req.query['date'] as string;

    const bucket = await admin.storage().bucket();
    const filesResponse = await bucket.getFiles();
    const files = filesResponse[0];
    const file = files.find((file) => file.metadata?.name?.includes(queryDate));

    if (!file) {
        resp.status(404);
        return;
    }

    const fileName = file.metadata.name;

    const tempFile = path.join(os.tmpdir(), fileName);
    await bucket.file(fileName).download({ destination: tempFile });

    const ranking = fs.readFileSync(tempFile, { encoding: 'utf-8' });

    const coins = JSON.parse(ranking)
        .sort(
            (a: { [x: string]: number }, b: { [x: string]: number }) =>
                a[rankKey] - b[rankKey]
        )
        .map((coin: { name: string }) => coin.name);

    resp.send({
        data: coins,
    });
});
