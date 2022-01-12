import {Router} from 'express';
import {artistController} from '../../controllers/artist-controller';
import performingEventRouter from './perform';
import {authenticate} from '../../middlewares/authenticateToken/authenticate-token';

const router = Router();

router.use('/perform-event', performingEventRouter);
router.get('/:id', authenticate.authRole('BASIC'), artistController.getArtist);
router.get('/' , authenticate.authRole('BASIC'), artistController.getArtists);
router.post('/', authenticate.authRole('ADMIN'), artistController.createArtist);
router.put('/:id', authenticate.authRole('ADMIN'), artistController.updateArtist);
router.delete('/:id', authenticate.authRole('ADMIN'), artistController.deleteArtist);

export default router