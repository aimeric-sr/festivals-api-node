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
const customError_1 = require("../responses/customError");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { username, password } = req.body;
                const user = yield auth_1.authService.login(username, password);
                if (user.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad username'));
                }
                if (user.isConnected === true) {
                    res.status(200).json({ accessToken: user.accessToken, refreshToken: user.refreshToken });
                }
                else {
                    return next(new customError_1.CustomError(400, 'General', 'wrong password'));
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
                const accessToken = yield auth_1.authService.getAccessToken(refreshToken);
                if (accessToken.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no refresh token find'));
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
                const deletedToken = yield auth_1.authService.logout(refreshToken);
                if (deletedToken.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no refresh token find'));
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
