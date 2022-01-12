import {Router} from 'express';
import {performingEventController} from '../../../controllers/performing-event-controller';
import {authenticate} from '../../../middlewares/authenticateToken/authenticate-token';

const router = Router();

router.post('/', authenticate.authRole('ADMIN'), performingEventController.addPerformingEvent);
router.delete('/', authenticate.authRole('ADMIN'), performingEventController.delPerformingEvent);

export default router