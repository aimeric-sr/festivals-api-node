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
exports.followEventRepository = void 0;
const SQLErrorHandler_1 = require("../middlewares/errors/SQLErrorHandler");
const customError_1 = require("../types/errors/customError");
class FollowEventRepository {
    addFollowEvent(user_id, event_id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'INSERT INTO mobile_app.follow_event(user_id, event_id) VALUES ($1, $2) returning user_id;';
                const values = [user_id, event_id];
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
    delFollowEvent(user_id, event_id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'DELETE FROM mobile_app.follow_event WHERE user_id=$1 AND event_id=$2;';
                const values = [user_id, event_id];
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
exports.followEventRepository = new FollowEventRepository();
