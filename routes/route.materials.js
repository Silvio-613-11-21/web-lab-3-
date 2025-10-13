const Router =  require('express')
const router = new Router();
const multer = require('multer');

const MaterialController = require('../controllers/Material.controllers');

const storage = multer.memoryStorage();
const upload = multer({
    storage : storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


router.post('/materials', upload.single('photo'), MaterialController.CreateMaterials);
router.get('/materialsall', MaterialController.getAllMaterials);
router.get('/material/:description', MaterialController.findMaterial);
router.delete('/material/:id', MaterialController.deleteMaterial);

module.exports = router;