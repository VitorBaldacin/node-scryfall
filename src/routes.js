const express = require('express');
const router = express.Router();

const CardsController = require('./controllers/CardsController');
const CardsValidator = require('./validators/CardValidator');

router.get('/ping', (req, res) => {
    res.json({pong:true});
});

//cards
router.get('/card', CardsController.all);
router.post('/card', CardsValidator.add, CardsController.add);
router.get('/cards/named/fuzzy/:name', CardsController.getFuzzyCard);
router.get('/cards/search/:text', CardsController.getTextCard);



module.exports = router;