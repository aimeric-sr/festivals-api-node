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
exports.authService = void 0;
const auth_1 = require("../repositories/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthService {
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_1.authRepository.getUserByUsername(username);
            if (user.rowCount === 0) {
                return user;
            }
            else {
                if (yield bcrypt.compare(password, user.rows[0].password)) {
                    const userToken = { id: user.rows[0].id, role: user.rows[0].name };
                    const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                    const refreshToken = jwt.sign(userToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
                    yield auth_1.authRepository.createToken(refreshToken);
                    return { isConnected: true, accessToken: accessToken, refreshToken: refreshToken };
                }
                else {
                    return { isConnected: false };
                }
            }
        });
    }
    getAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const resAccessToken = yield auth_1.authRepository.searchRefreshToken(refreshToken);
            let currentAccessToken = null;
            if (resAccessToken.rowCount === 0) {
                return { rowCount: 0 };
            }
            else {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    currentAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                });
                return { isConnected: true, accessToken: currentAccessToken, rowCount: 1 };
            }
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return auth_1.authRepository.deleteRefreshToken(refreshToken);
        });
    }
}
exports.authService = new AuthService();
