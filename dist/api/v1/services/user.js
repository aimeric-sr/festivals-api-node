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
exports.userService = void 0;
const user_1 = require("../repositories/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customError_1 = require("../types/errors/customError");
class UserService {
    getUserIncluding(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.userRepository.getUserIncluding(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    getUsersIncluding(pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.userRepository.getUsersIncluding(pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    createUser(username, password, email, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                return user_1.userRepository.createUser(username, hashedPassword, email, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    updateUser(id, username, password, email, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                return user_1.userRepository.updateUser(id, username, hashedPassword, email, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    deleteUser(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.userRepository.deleteUser(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
}
exports.userService = new UserService();
