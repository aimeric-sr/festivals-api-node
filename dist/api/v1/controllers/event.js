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
exports.eventController = void 0;
const event_1 = require("../services/event");
const customError_1 = require("../responses/customError");
const dotenv = require('dotenv');
dotenv.config();
class EventController {
    getEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield event_1.eventService.getEvent(parseInt(id));
                if (user.code === '22P02') {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                if (user.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                else
                    res.status(200).json(user.rows[0]);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield event_1.eventService.getEvents();
                if (users.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                else {
                    res.status(200).json(users.rows);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, location, started_date, finish_date } = req.body;
                const rowCreated = yield event_1.eventService.createEvent(name, location, started_date, finish_date);
                res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
                res.status(201).json();
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    updateEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { name, location, started_date, finish_date } = req.body;
                const rowUpdated = yield event_1.eventService.updateEvent(parseInt(id), name, location, started_date, finish_date);
                if (rowUpdated.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                else
                    res.status(200).json();
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const rowDeleted = yield event_1.eventService.deleteEvent(parseInt(id));
                if (rowDeleted.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                else
                    res.status(204).json();
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
}
exports.eventController = new EventController();
