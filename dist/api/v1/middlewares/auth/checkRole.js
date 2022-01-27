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
exports.checkRole = void 0;
const customError_1 = require("../../responses/customError");
const DBConnectionHandler_1 = require("../../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { role } = req.jwtPayload;
        if (roles.indexOf(role) === -1) {
            const errors = [
                'Unauthorized - Insufficient user rights',
                `Current role: ${role}. Required role: ${roles.toString()}`,
            ];
            const customError = new customError_1.CustomError(401, 'Unauthorized', 'Unauthorized - Insufficient user rights', errors);
            return next(customError);
        }
        switch (role) {
            case 'ADMIN':
                req.pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
            case 'BASIC':
                req.pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getBasicPoolConnection;
            case 'NOAUTH':
                req.pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getNoAuthPoolConnection;
        }
        return next();
    });
};
exports.checkRole = checkRole;
