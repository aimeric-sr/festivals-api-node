"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("../../types/errors/customError");
require("dotenv/config");
const checkJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return next(new customError_1.CustomError(400, 'General', 'Authorization header not provided'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new customError_1.CustomError(400, 'General', 'JWT Token not provided'));
    }
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.jwtPayload = jwtPayload;
    }
    catch (err) {
        return next(new customError_1.CustomError(401, 'Raw', 'JWT error'));
    }
};
exports.checkJWT = checkJWT;
