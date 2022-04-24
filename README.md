# Crypto Speedster

Sometimes we miss great opportunities because we cannot see them and realize it when it's just too late. In my case I
missed the opportunities to invest in Dogecoin and Shiba Inu. What else did I miss? **Crypto Speedster visualizes how
much a crypto currency is rising**. By that we should see early which coins are trending and never miss an opportunity
again.

## Backend

**scheduledCryptoListingDownload** downloads every night the current Crypto ranking.

**getRanking** is a http endpoint which returns the ranking

## Frontend

The frontend is built with the Angular framework.

`cd frontend & npm run build` builds the web app

## Deployment

`firebase deploy --only functions` deploys the functions.

`firebase deploy --only hosting` deploys the web app.
