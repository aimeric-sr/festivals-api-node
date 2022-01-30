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
exports.authController = void 0;
const auth_1 = require("../services/auth");
const customError_1 = require("../types/errors/customError");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const pool = req.pool;
                const user = yield auth_1.authService.login(username, password, pool, next);
                if (typeof user === 'undefined') {
                    return;
                }
                else {
                    res.status(200).json({ accessToken: user.accessToken, refreshToken: user.refreshToken });
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                const pool = req.pool;
                const accessToken = yield auth_1.authService.getAccessToken(refreshToken, pool, next);
                if (typeof accessToken === 'undefined') {
                    return;
                }
                else {
                    res.status(200).json({ accessToken: accessToken.accessToken });
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                const pool = req.pool;
                const deletedToken = yield auth_1.authService.logout(refreshToken, pool, next);
                if (typeof deletedToken === 'undefined') {
                    return;
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
exports.authController = new AuthController();
