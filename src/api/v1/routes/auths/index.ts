import {Router} from 'express';
import {userController} from '../../controllers/user-controller';
import {authController} from '../../controllers/auth-controller';

const router = Router();

router.post('/register', userController.createUser);
router.post('/login', authController.login);
router.post('/token', authController.getToken);
router.post('/logout', authController.logout);

export default router
