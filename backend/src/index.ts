import * as functions from "firebase-functions";

exports.scheduledFunctionCrontab = functions.pubsub.schedule('*/20 * * * *')
    .onRun((context: any) => {
        functions.logger.info("Cronjob works!", {structuredData: true});
        return null;
    });
