const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-controller');
const auth = require('../../middlewares/authenticateToken/authenticate-token');

router.get('/:id', userController.getUser);
router.get('/', auth.authenticateToken ,userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;