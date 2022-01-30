"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followEventController = exports.FollowEventController = void 0;
const follow_event_1 = require("../services/follow-event");
const customError_1 = require("../types/errors/customError");
require("dotenv/config");
class FollowEventController {
    addFollowEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, event_id } = req.body;
                const pool = req.pool;
                const rowCreated = yield follow_event_1.followEventService.addFollowEvent(user_id, event_id, pool, next);
                if (typeof rowCreated === 'undefined') {
                    return;
                }
                else {
                    res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
                    res.status(201).json();
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    delFollowEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, event_id } = req.body;
                const pool = req.pool;
                const rowDeleted = yield follow_event_1.followEventService.delFollowEvent(user_id, event_id, pool, next);
                if (typeof rowDeleted === 'undefined') {
                    return;
                }
                else if (rowDeleted.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no follow find with these ids, can\'t delete it'));
                }
                else {
                    res.status(204).json();
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
}
exports.FollowEventController = FollowEventController;
exports.followEventController = new FollowEventController();
