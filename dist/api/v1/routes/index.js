"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const express_1 = require("express");
const index_1 = require("./users/index");
const index_2 = require("./events/index");
const index_3 = require("./artists/index");
const index_4 = require("./auths/index");
const _404_1 = require("./pages/404");
const root_1 = require("./pages/root");
const routerV1 = (0, express_1.Router)();
exports.routerV1 = routerV1;
routerV1.use('/users', index_1.routerUsers);
routerV1.use('/events', index_2.routerEvents);
routerV1.use('/artists', index_3.routerArtist);
routerV1.use('/auth', index_4.routerAuth);
routerV1.use('/', root_1.routerRoot);
routerV1.use(_404_1.router404);
