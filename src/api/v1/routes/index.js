const express = require('express');
const routerUser = require('./users');
const routerAuth = require('./auths');
const router = express.Router();

router.use('/users', routerUser);
router.use('/auth', routerAuth);

module.exports = router;
