import {Router} from 'express';
import {userController} from '../../controllers/user-controller';
import {authenticate} from '../../middlewares/authenticateToken/authenticate-token';
import followArtistRouter from './follow/artist';
import followEventRouter from './follow/event';

const router = Router();

router.use('/follow-artist', followArtistRouter);
router.use('/follow-event', followEventRouter);

router.get('/artists', authenticate.authRole('BASIC') ,userController.getUsersIncludingArtists);
router.get('/events' , authenticate.authRole('BASIC'),userController.getUsersIncludingEvents);
router.get('/all' ,userController.getUsersIncluding);
router.get('/all/:id', authenticate.authRole('BASIC') ,userController.getUserIncluding);

router.get('/:id', authenticate.authRole('BASIC'), userController.getUser);
router.get('/', authenticate.authRole('BASIC'),userController.getUsers);
//router.post('/', userController.createUser);
router.put('/:id',  authenticate.authRole('BASIC'), userController.updateUser);
router.delete('/:id', authenticate.authRole('BASIC'), userController.deleteUser);

export default router

