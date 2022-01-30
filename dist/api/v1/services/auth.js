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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const auth_1 = require("../repositories/auth");
const customError_1 = require("../types/errors/customError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class AuthService {
    login(username, password, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_1.authRepository.getUserByUsername(username, pool, next);
                if (user.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no user found with this username'));
                }
                else {
                    if (yield bcryptjs_1.default.compare(password, user.rows[0].password)) {
                        const userToken = { id: user.rows[0].id, role: user.rows[0].name };
                        const accessToken = jsonwebtoken_1.default.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                        const refreshToken = jsonwebtoken_1.default.sign(userToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
                        yield auth_1.authRepository.createToken(refreshToken, pool, next);
                        return { accessToken: accessToken, refreshToken: refreshToken };
                    }
                    else {
                        return next(new customError_1.CustomError(400, 'General', 'wrong password'));
                    }
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    getAccessToken(refreshToken, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resAccessToken = yield auth_1.authRepository.searchRefreshToken(refreshToken, pool, next);
                let currentAccessToken = null;
                if (resAccessToken.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad refresh token provided'));
                }
                else {
                    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                        if (err) {
                            console.log(err);
                        }
                        currentAccessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                    });
                    return { accessToken: currentAccessToken };
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    logout(refreshToken, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return auth_1.authRepository.deleteRefreshToken(refreshToken, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
}
exports.authService = new AuthService();
