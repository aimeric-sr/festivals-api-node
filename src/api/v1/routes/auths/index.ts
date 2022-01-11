import {Router} from 'express';
const router = Router();

const userController = require('../../controllers/user-controller');
const authController = require('../../controllers/auth-controller');

router.post('/register', userController.createUser);
router.post('/login', authController.login);
router.post('/token', authController.getToken);
router.post('/logout', authController.logout);

export default router
