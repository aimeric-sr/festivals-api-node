const express = require('express');
const routerUser = require('./users');
const routerEvent = require('./events');
const routerArtist = require('./artists');
const routerAuth = require('./auths');
const router = express.Router();

router.use('/users', routerUser);
router.use('/events', routerEvent);
router.use('/artists', routerArtist);
router.use('/auth', routerAuth);

export default router