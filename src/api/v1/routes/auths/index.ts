import {Router} from 'express';
import {userController} from '../../controllers/user';
import {authController} from '../../controllers/auth';
import {checkRole} from '../../middlewares/auth/checkRole';

const routerAuth = Router();

routerAuth.post('/register', [checkRole(['NOAUTH'])] ,userController.createUser);
routerAuth.post('/login', authController.login);
routerAuth.post('/token', authController.getToken);
routerAuth.post('/logout', authController.logout);

export {routerAuth}
