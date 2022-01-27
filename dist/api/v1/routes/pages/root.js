"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRoot = void 0;
const express_1 = require("express");
const routerRoot = (0, express_1.Router)();
exports.routerRoot = routerRoot;
routerRoot.get('/', (req, res) => {
    res.status(200).header('Content-Type', 'text/html').send(`<h4> RESTful API festivals</h4>`);
});
