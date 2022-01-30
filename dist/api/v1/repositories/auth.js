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
exports.authRepository = void 0;
const SQLErrorHandler_1 = require("../middlewares/errors/SQLErrorHandler");
const customError_1 = require("../types/errors/customError");
class AuthRepository {
    getUserByUsername(username, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'SELECT * FROM mobile_app.users LEFT JOIN mobile_app.roles ON users.role=roles.id WHERE username=$1;';
                const values = [username];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    console.log(err);
                    switch (err.code) {
                        case '42501':
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "insufficient right");
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
    getUuidRole(roleName, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'SELECT id FROM mobile_app.roles WHERE name=$1;';
                const values = [roleName];
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
    createToken(refreshToken, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'INSERT INTO mobile_app.refresh_token(token_value) VALUES ($1);';
                const values = [refreshToken];
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
    searchRefreshToken(refreshToken, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'SELECT * FROM mobile_app.refresh_token WHERE token_value=$1;';
                const values = [refreshToken];
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
    deleteRefreshToken(refreshTokenDel, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = 'DELETE FROM mobile_app.refresh_token WHERE token_value=$1 returning id;';
                const values = [refreshTokenDel];
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
exports.authRepository = new AuthRepository();
