import {Router} from 'express';
const router = Router();

const followArtistController = require('../../../../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/controllers/follow-artist-controller');
const auth = require('../../../../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/middlewares/authenticateToken/authenticate-token');

router.post('/', auth.authRole('BASIC'), followArtistController.addFollowArtist);
router.delete('/', auth.authRole('BASIC'), followArtistController.delFollowArtist);

export default router
