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
router.delete('/readyordersdel/:id', ReadyOrdersController.deleteReadyOrder);
router.post('/readyordersfind', ReadyOrdersController.findReadyOrder);
router.get('/readyorder/:id', ReadyOrdersController.getOneReadyOrder);

module.exports = router;