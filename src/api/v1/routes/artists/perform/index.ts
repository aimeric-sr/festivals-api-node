import {Router} from 'express';
const router = Router();

const performingEventController = require('../../controllers/performing-event-controller');
const auth = require('../../middlewares/authenticateToken/authenticate-token');

router.post('/', auth.authRole('ADMIN'), performingEventController.addPerformingEvent);
router.delete('/', auth.authRole('ADMIN'), performingEventController.delPerformingEvent);

export default router