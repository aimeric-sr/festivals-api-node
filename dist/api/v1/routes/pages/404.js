"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router404 = void 0;
const express_1 = require("express");
const router404 = (0, express_1.Router)();
exports.router404 = router404;
router404.get('*', (req, res) => {
    return res.status(404).json('Router API v1 Not Found, 404 Not Found');
});
