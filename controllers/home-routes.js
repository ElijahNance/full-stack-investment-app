const router = require('express').Router();
const {User, Stock} = require('../models/');
const getData = require('../lib/alpaca');
const { find } = require('lodash');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {include:Stock});
    
    console.log(req.session.loggedIn);
    
    
    if(req.session.loggedIn) {
      userData.stocks.forEach((stockData) => {
        const stock=stockData.dataValues;
      });
      res.render('homepage', { loggedIn: req.session.loggedIn, stocks: userData.stocks, userName: userData.dataValues.username  });
    } else {
      res.render('homepage', { loggedIn: req.session.loggedIn });
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/about', (req, res) => {
  try {
    res.render('about', {loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/purchase', (req, res) => {
  console.log(req.query.stocksymbol);

  if (req.session.loggedIn) {
    
    if (req.query.stocksymbol) {
      getData(req.query.stocksymbol)
        .then((dataset) => {
          const estimatedTradeCost = req.query.numshares * dataset.trade.p;
          res.render('purchase',{loggedIn: req.session.loggedIn, stockData: dataset, numShares: req.query.numshares, tradeCost: estimatedTradeCost.toFixed(2)});
        })
        .catch((error) => {console.log(error)})  
    } else {
      res.render('purchase', {loggedIn: req.session.loggedIn});
    };

  } else {
    res.render("login");
  }

});

router.get('/confirmation', (req, res) => {
  
  if (req.session.loggedIn) {
    //Capture query string parm values
    const stockSymbol = req.query.stocksymbol;
    const stockPrice = req.query.stockprice;
    const numShares = req.query.numshares;
    const tradeCost = req.query.tradecost;

    //Create a JSON for the model data
    const newRecData = {
      stock_name: stockSymbol,
      price: stockPrice,
      shares: numShares,
      investor_id: req.session.userId
    };

    //Push the trade to the database
    Stock.create(newRecData)
      .then(results => {
        //Successful insert - go to confirmation page with the stock values
        res.render("confirmation",{loggedIn: req.session.loggedIn, stockSymbol: stockSymbol, stockPrice: stockPrice, numShares: numShares, tradeCost: tradeCost});
      })
      .catch(error => {
        //Problem in insert - console log the error and send notice to the user
        console.log(error);
        res.render("confirmation",{stockSymbol: "Error", stockPrice: "", numShares: "", tradeCost: ""});
      })

  } else {
    res.render("login");
  }
});


module.exports = router;
