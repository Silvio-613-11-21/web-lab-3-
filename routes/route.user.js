const Router =  require('express')

const router = new Router();

const userController = require('../controllers/user.controllers');

router.post('/user', userController.createUser);
router.get( '/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/userLogin', userController.loginUser);

module.exports = router;