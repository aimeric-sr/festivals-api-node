import {Router} from 'express';
import routerUser from './users';
import routerEvent from './events';
import routerArtist from './artists';
import routerAuth from './auths';

const router = Router();

router.use('/users', routerUser);
router.use('/events', routerEvent);
router.use('/artists', routerArtist);
router.use('/auth', routerAuth);

export default router