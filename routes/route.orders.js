const Router =  require('express')
const router = new Router();

const OrdersController = require('../controllers/Orders.controllers');

router.post('/order/:client_id/:material_id', OrdersController.CreateOrder);
router.get('/orders', OrdersController.getAllOrders);

module.exports = router;