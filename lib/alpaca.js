//This library lets us talk to Alpaca for stock info
const fetch = require('node-fetch');
//Alpaca creds
const apiKey = "PKJ0YB7E29HFISYF60K1";
const apiKeySecret = "aAjVSGpTh19CrwVgfEOBoxbt8zBSMFvHegFYZeu5";

//Alpaca endpoint we're using
const singleStockLatestTrade = "https://data.alpaca.markets/v2/stocks/????/trades/latest?feed=iex&currency=USD";

async function getData(stockSymbol) {

    const svcUrl = singleStockLatestTrade.replace("????", stockSymbol);
    console.log(svcUrl);

    const response=await fetch(svcUrl, {
        "method": "GET",
        "mode": "cors",
        "headers": {
            "content-type": "application/json",
            "APCA-API-KEY-ID": apiKey,
            "APCA-API-SECRET-KEY": apiKeySecret,
        }
    });
    
    const dataSet=await response.json();
    
    return dataSet;

};

module.exports = getData;