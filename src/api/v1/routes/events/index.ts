import {Router} from 'express';
import {eventController} from '../../controllers/event-controller';
import {authenticate} from '../../middlewares/authenticateToken/authenticate-token';

const router = Router();

router.get('/:id', authenticate.authRole('BASIC'), eventController.getEvent);
router.get('/', authenticate.authRole('BASIC'),eventController.getEvents);
router.post('/', authenticate.authRole('ADMIN'), eventController.createEvent);
router.put('/:id', authenticate.authRole('ADMIN'), eventController.updateEvent);
router.delete('/:id', authenticate.authRole('ADMIN'), eventController.deleteEvent);

export default router