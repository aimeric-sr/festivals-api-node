import {Router} from 'express';
import {followEventController} from '../../../../controllers/follow-event-controller';
import {authenticate} from '../../../../middlewares/authenticateToken/authenticate-token';

const router = Router();

router.post('/', authenticate.authRole('BASIC'), followEventController.addFollowEvent);
router.delete('/', authenticate.authRole('BASIC'), followEventController.delFollowEvent);

export default router