import {Router} from 'express';
const router = Router();

const followEventController = require('../../../../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/controllers/follow-event-controller');
const auth = require('../../../../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/middlewares/authenticateToken/authenticate-token');

router.post('/', auth.authRole('BASIC'), followEventController.addFollowEvent);
router.delete('/', auth.authRole('BASIC'), followEventController.delFollowEvent);

export default router