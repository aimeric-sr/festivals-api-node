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
class UserService {
    constructor() {
        this.userRepository = new user_1.UserRepository();
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUser(id);
        });
    }
    getUserIncluding(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserIncluding(id);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUsers();
        });
    }
    getUsersIncludingArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUsersIncludingArtists();
        });
    }
    getUsersIncludingEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUsersIncludingEvents();
        });
    }
    getUsersIncluding() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUsersIncluding();
        });
    }
    createUser(pool, username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return this.userRepository.createUser(pool, username, hashedPassword, email);
        });
    }
    updateUser(id, username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return this.userRepository.updateUser(id, username, hashedPassword, email);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.deleteUser(id);
        });
    }
}
exports.userService = new UserService();
