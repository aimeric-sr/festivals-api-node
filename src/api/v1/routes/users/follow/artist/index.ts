import {Router} from 'express';
import {followArtistController} from '../../../../controllers/follow-artist-controller';
import {authenticate} from '../../../../middlewares/authenticateToken/authenticate-token';

const router = Router();

router.post('/', authenticate.authRole('BASIC'), followArtistController.addFollowArtist);
router.delete('/', authenticate.authRole('BASIC'), followArtistController.delFollowArtist);

export default router
