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
const user_1 = require("../services/user");
const customError_1 = require("../responses/customError");
const dotenv = require('dotenv');
dotenv.config();
class UserController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_1.userService.getUser(parseInt(id));
                if (user.code === '22P02') {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
                }
                if (user.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
                }
                else
                    res.status(200).json(user.rows[0]);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getUserIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_1.userService.getUserIncluding(parseInt(id));
                if (user.code === '22P02') {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
                }
                if (user.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
                }
                else
                    res.status(200).json(user.rows[0].row_to_json);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.userService.getUsers();
                if (users) {
                    if (users.rowCount === 0) {
                        return next(new customError_1.CustomError(404, 'General', 'bad request'));
                    }
                    else {
                        res.status(200).json(users.rows);
                    }
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'bad request'));
            }
        });
    }
    getUsersIncludingArtists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.userService.getUsersIncludingArtists();
                if (users.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
                }
                else {
                    res.status(200).json(users.rows[0].array_to_json);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'bad request'));
            }
        });
    }
    getUsersIncludingEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.userService.getUsersIncludingEvents();
                if (users.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
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
    getUsersIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.userService.getUsersIncluding();
                if (users.rows.length === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
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
                console.log(req.pool);
                const rowCreated = yield user_1.userService.createUser(req.pool, username, password, email);
                console.log(rowCreated);
                res.status(201).json();
            }
            catch (err) {
                console.log(err);
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { username, password, email } = req.body;
                const rowUpdated = yield user_1.userService.updateUser(parseInt(id), username, password, email);
                if (rowUpdated && rowUpdated.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'bad request'));
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
                const rowDeleted = yield user_1.userService.deleteUser(parseInt(id));
                if (rowDeleted && rowDeleted.rowCount === 0) {
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
