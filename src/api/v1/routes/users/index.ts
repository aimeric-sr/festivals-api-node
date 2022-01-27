import { Router } from 'express';
import {userController} from '../../controllers/user';
import {checkJWT} from '../../middlewares/auth/checkJWT';
import {checkRole} from '../../middlewares/auth/checkRole';
import {routerFollowArtist} from './follow/artist/index';
import {routerFollowEvent} from './follow/event/index';

const routerUsers = Router();

routerUsers.use('/follow-artist', routerFollowArtist);
routerUsers.use('/follow-event', routerFollowEvent);

routerUsers.get('/artists', [checkJWT, checkRole(['ADMIN', 'BASIC'])] ,userController.getUsersIncludingArtists);

routerUsers.get('/events' , [checkJWT, checkRole(['ADMIN', 'BASIC'])] ,userController.getUsersIncludingEvents);
routerUsers.get('/all' ,userController.getUsersIncluding);
routerUsers.get('/all/:id', [checkJWT, checkRole(['ADMIN', 'BASIC'])] ,userController.getUserIncluding);

routerUsers.get('/:id', [checkJWT, checkRole(['ADMIN', 'BASIC'])], userController.getUser);
routerUsers.get('/', [checkJWT, checkRole(['ADMIN', 'BASIC'])],userController.getUsers);
//routerUsers.post('/', userController.createUser);
routerUsers.put('/:id',  [checkJWT, checkRole(['ADMIN', 'BASIC'])], userController.updateUser);
routerUsers.delete('/:id', [checkJWT, checkRole(['ADMIN', 'BASIC'])], userController.deleteUser);

export { routerUsers }

