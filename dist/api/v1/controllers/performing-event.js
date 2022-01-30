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
exports.performingEventController = void 0;
const performing_event_1 = require("../services/performing-event");
const customError_1 = require("../types/errors/customError");
require("dotenv/config");
class PerformingEventController {
    addPerformingEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { artist_id, event_id } = req.body;
                const pool = req.pool;
                const rowCreated = yield performing_event_1.performingEventService.addPerformingEvent(artist_id, event_id, pool, next);
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
    delPerformingEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { artist_id, event_id } = req.body;
                const pool = req.pool;
                const rowDeleted = yield performing_event_1.performingEventService.delPerformingEvent(artist_id, event_id, pool, next);
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
exports.performingEventController = new PerformingEventController();
