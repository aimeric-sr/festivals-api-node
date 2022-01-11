import {Router} from 'express';
const router = Router();

const eventController = require('../../controllers/event-controller');
const auth = require('../../middlewares/authenticateToken/authenticate-token');

router.get('/:id', auth.authRole('BASIC'), eventController.getEvent);
router.get('/', auth.authRole('BASIC'),eventController.getEvents);
router.post('/', auth.authRole('ADMIN'), eventController.createEvent);
router.put('/:id', auth.authRole('ADMIN'), eventController.updateEvent);
router.delete('/:id', auth.authRole('ADMIN'), eventController.deleteEvent);

export default router