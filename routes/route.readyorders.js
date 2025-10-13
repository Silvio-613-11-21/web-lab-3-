const Router =  require('express')
const router = new Router();
const multer = require('multer');
const ReadyOrdersController = require('../controllers/readyorders.controllers');

const storage = multer.memoryStorage();
const upload = multer({
    storage : storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


router.post('/readyorders',upload.single('photo'), ReadyOrdersController.createReadyOrder);
router.get('/readyordersall', ReadyOrdersController.getAllReadyOrders);
router.delete('/readyorders/:id', ReadyOrdersController.deleteReadyOrder);
router.get('/readyorders/:description', ReadyOrdersController.findReadyOrder);

module.exports = router;