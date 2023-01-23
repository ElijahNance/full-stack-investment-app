const router = require('express').Router();
const { Stock } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const stockData = Stock.findAll({
            where: { investor_id: req.session.userId }
        });
        const stocks = stockData.map((stock) =>
            stock.get({ plain: true })
        );
        res.render('homepage', {
            stocks,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;