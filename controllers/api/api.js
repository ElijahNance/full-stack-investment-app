const Alpaca = require("@alpacahq/alpaca-trade-api");

const options = {
    keyId: "PKJ0YB7E29HFISYF60K1",
    secretKey: "aAjVSGpTh19CrwVgfEOBoxbt8zBSMFvHegFYZeu5",
    paper: true,
  };
  const alpaca = new Alpaca(options);

//   alpaca.getAccount().then((account) => {
//     console.log("Current Account:", account);
//   });

const buyParams = {
    symbol: "BTC/USD", //put var for user selected stock
    qty: 1,
    side: "buy",
    type: "market",
    time_in_force: "gtc",
  };
  
//   alpaca.createOrder(buyParams).then((order) => {
//     console.log("Order details: ", order);
//   });

//   alpaca.getPositions().then((positions) => {
//     positions.forEach((position) => console.log(position));
//   });