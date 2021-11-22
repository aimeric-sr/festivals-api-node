const express = require('express');
const routerUser = require('./users');
const router = express.Router();

router.use('/users', routerUser);

module.exports = router;
