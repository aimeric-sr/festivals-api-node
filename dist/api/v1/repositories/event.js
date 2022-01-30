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
exports.eventRepository = void 0;
const SQLErrorHandler_1 = require("../middlewares/errors/SQLErrorHandler");
const customError_1 = require("../types/errors/customError");
class EventRepository {
    getEvent(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'SELECT * FROM mobile_app.events WHERE id=$1;';
                const values = [id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        case '22P02':
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "UUID not found");
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    getEvents(pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'SELECT * FROM mobile_app.events;';
                return yield pool.query(text);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    createEvent(name, location, started_date, finish_date, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'INSERT INTO mobile_app.events(name, location, started_date, finish_date) VALUES ($1, $2, $3, $4) returning id;';
                const values = [name, location, started_date, finish_date];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    updateEvent(id, name, location, started_date, finish_date, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'UPDATE mobile_app.events set name=$1, location=$2, started_date=$3, finish_date=$4 WHERE id=$5;';
                const values = [name, location, started_date, finish_date, id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    deleteEvent(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'DELETE FROM mobile_app.events WHERE id=$1;';
                const values = [id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
}
exports.eventRepository = new EventRepository();
