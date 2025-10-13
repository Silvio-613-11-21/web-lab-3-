const Router =  require('express')
const router = new Router();
const ReadyOrdersStoriesController = require('../controllers/readyordersstories.controllers');

router.post ('/readyordersstories/:client_id/:readyorder_id', ReadyOrdersStoriesController.AddReadyOrder);
router.get('/readyordersstories/:client_id', ReadyOrdersStoriesController.getAllReadyOrders);

module.exports = router;