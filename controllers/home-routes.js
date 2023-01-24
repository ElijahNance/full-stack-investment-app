const router = require('express').Router();
const {User, Stock} = require('../models/');
const getData = require('../lib/alpaca');
const { find } = require('lodash');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {include:Stock});
    console.log(userData);
    console.log(req.session.loggedIn);
    res.render('homepage', { loggedIn: req.session.loggedIn });
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
  //ToDo: get query parm for this route that handles stock symbol
  console.log(req.query.stocksymbol);

  if (req.session.loggedIn) {
    console.log("Getting Stock");
    
    if (req.query.stocksymbol) {
      getData(req.query.stocksymbol)
        .then((dataset) => {
          console.log(dataset);
          console.log("Got Stock");
          //ToDo - Start of code to do the screen logic
          console.log("Stock Price",dataset.trade.p)
          const estimatedTradeCost = req.query.numshares * dataset.trade.p;
          //ToDo - End of code to do the screen logic
          res.render('purchase',{stockData: dataset, numShares: req.query.numshares, tradeCost: estimatedTradeCost});
        })
        .catch((error) => {console.log(error)})  
    } else {
      console.log("No Stock Symbol");
      res.render('purchase');
    };

  } else {
    res.render("login");
  }

});


module.exports = router;
