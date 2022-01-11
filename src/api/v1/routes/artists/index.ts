import {Router} from 'express';
const router = Router();

const artistController = require('../../controllers/artist-controller');
const performingEventRouter = require('./perform');
const auth = require('../../middlewares/authenticateToken/authenticate-token');

router.use('/perform-event', performingEventRouter);

router.get('/:id', auth.authRole('BASIC'), artistController.getArtist);
router.get('/' , auth.authRole('BASIC'), artistController.getArtists);
router.post('/', auth.authRole('ADMIN'), artistController.createArtist);
router.put('/:id', auth.authRole('ADMIN'), artistController.updateArtist);
router.delete('/:id', auth.authRole('ADMIN'), artistController.deleteArtist);

export default router