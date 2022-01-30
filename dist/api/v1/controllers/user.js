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
exports.userController = void 0;
const customError_1 = require("./../types/errors/customError");
const user_1 = require("../services/user");
require("dotenv/config");
class UserController {
    getUserIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pool = req.pool;
                const userRows = yield user_1.userService.getUserIncluding(parseInt(id), pool, next);
                if (typeof userRows === 'undefined') {
                    return;
                }
                else if (userRows.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'No user found'));
                }
                else {
                    res.status(200).json(userRows.rows);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getUsersIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = req.pool;
                const users = yield user_1.userService.getUsersIncluding(pool, next);
                if (typeof users === 'undefined') {
                    return;
                }
                else if (users.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'No users found'));
                }
                else {
                    res.status(200).json(users.rows[0].array_to_json);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(404, 'General', 'bad request'));
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                const pool = req.pool;
                const userCreated = yield user_1.userService.createUser(username, password, email, pool, next);
                if (typeof userCreated === 'undefined') {
                    return;
                }
                else {
                    res.location('http://' + process.env.PGHOST + ':' + process.env.PORT + req.originalUrl + '/' + userCreated.rows[0].id);
                    res.status(201).json();
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error'));
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { username, password, email } = req.body;
                const pool = req.pool;
                const rowUpdated = yield user_1.userService.updateUser(parseInt(id), username, password, email, pool, next);
                if (typeof rowUpdated === 'undefined') {
                    return;
                }
                else if (rowUpdated.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'wrong uuid'));
                }
                else {
                    res.status(200).json();
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pool = req.pool;
                const rowDeleted = yield user_1.userService.deleteUser(parseInt(id), pool, next);
                if (typeof rowDeleted === 'undefined') {
                    return;
                }
                else if (rowDeleted.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
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
exports.userController = new UserController();
