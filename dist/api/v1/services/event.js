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
exports.eventService = void 0;
const event_1 = require("../repositories/event");
const customError_1 = require("../types/errors/customError");
class EventService {
    getEvent(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return event_1.eventRepository.getEvent(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    getEvents(pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return event_1.eventRepository.getEvents(pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    createEvent(name, location, started_date, finish_date, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return event_1.eventRepository.createEvent(name, location, started_date, finish_date, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    updateEvent(id, name, location, started_date, finish_date, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return event_1.eventRepository.updateEvent(id, name, location, started_date, finish_date, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    deleteEvent(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return event_1.eventRepository.deleteEvent(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
}
exports.eventService = new EventService();
