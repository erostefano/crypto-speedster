import * as functions from "firebase-functions";
import axios from "axios";

exports.scheduledFunctionCrontab = functions.pubsub.schedule("*/20 * * * *")
    .onRun(async () => {
        try {
            const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000", {
                headers: {
                    "X-CMC_PRO_API_KEY": "fba02c9b-e35c-4332-bcbb-7ccad47c9607",
                },
            });
            functions.logger.info(response.data);
        } catch (e) {
            functions.logger.error(e);
        }

        return null;
    });
