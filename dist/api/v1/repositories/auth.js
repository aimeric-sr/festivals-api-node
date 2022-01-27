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
const DBConnectionHandler_1 = require("../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
class AuthRepository {
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.users LEFT JOIN mobile_app.roles ON users.role=roles.id WHERE username=$1;', [username])
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    getUuidRole(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT id FROM mobile_app.roles WHERE name=$1;', [roleName])
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    createToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('INSERT INTO mobile_app.refresh_token(token_value) VALUES ($1);', [refreshToken])
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    searchRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.refresh_token WHERE token_value=$1;', [refreshToken])
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    deleteRefreshToken(refreshTokenDel) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('DELETE FROM mobile_app.refresh_token WHERE token_value=$1 returning id;', [refreshTokenDel])
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
}
exports.authRepository = new AuthRepository();
