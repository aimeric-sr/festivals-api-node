import {Router} from 'express';
const router = Router();

const userController = require('../../controllers/user-controller');
const auth = require('../../middlewares/authenticateToken/authenticate-token');
const followArtistRouter = require('./follow/artist');
const followEventRouter = require('./follow/event');

router.use('/follow-artist', followArtistRouter);
router.use('/follow-event', followEventRouter);

router.get('/artists', auth.authRole('BASIC') ,userController.getUsersIncludingArtists);
router.get('/events' , auth.authRole('BASIC'),userController.getUsersIncludingEvents);
router.get('/all' ,userController.getUsersIncluding);
router.get('/all/:id', auth.authRole('BASIC') ,userController.getUserIncluding);

router.get('/:id', auth.authRole('BASIC'), userController.getUser);
router.get('/', auth.authRole('BASIC'),userController.getUsers);
//router.post('/', userController.createUser);
router.put('/:id',  auth.authRole('BASIC'), userController.updateUser);
router.delete('/:id', auth.authRole('BASIC'), userController.deleteUser);

export default router

