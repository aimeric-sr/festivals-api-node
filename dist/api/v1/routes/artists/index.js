"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artist_1 = require("../../controllers/artist");
const perform_1 = __importDefault(require("./perform"));
const checkJWT_1 = require("../../middlewares/auth/checkJWT");
const checkRole_1 = require("../../middlewares/auth/checkRole");
const router = (0, express_1.Router)();
router.use('/perform-event', perform_1.default);
router.get('/:id', [checkJWT_1.checkJWT, (0, checkRole_1.checkRole)(['ADMIN', 'BASIC'])], artist_1.artistController.getArtist);
router.get('/', [checkJWT_1.checkJWT, (0, checkRole_1.checkRole)(['ADMIN', 'BASIC'])], artist_1.artistController.getArtists);
router.post('/', [checkJWT_1.checkJWT, (0, checkRole_1.checkRole)(['ADMIN'])], artist_1.artistController.createArtist);
router.put('/:id', [checkJWT_1.checkJWT, (0, checkRole_1.checkRole)(['ADMIN'])], artist_1.artistController.updateArtist);
router.delete('/:id', [checkJWT_1.checkJWT, (0, checkRole_1.checkRole)(['ADMIN'])], artist_1.artistController.deleteArtist);
exports.default = router;
