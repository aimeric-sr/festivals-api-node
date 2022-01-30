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
exports.artistController = void 0;
const artist_1 = require("../services/artist");
const customError_1 = require("../types/errors/customError");
require("dotenv/config");
class ArtistController {
    getArtistIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pool = req.pool;
                const user = yield artist_1.artistService.getArtist(parseInt(id), pool, next);
                if (typeof user === 'undefined') {
                    return;
                }
                else if (user.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'No event found'));
                }
                else {
                    res.status(200).json(user.rows[0]);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    getArtistsIncluding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = req.pool;
                const artists = yield artist_1.artistService.getArtists(pool, next);
                if (typeof artists === 'undefined') {
                    return;
                }
                else if (artists.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'No artist found'));
                }
                else {
                    res.status(200).json(artists.rows);
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    createArtist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, nationality, music_styles } = req.body;
                const pool = req.pool;
                const rowCreated = yield artist_1.artistService.createArtist(name, nationality, music_styles, pool, next);
                if (typeof rowCreated === 'undefined') {
                    return;
                }
                else {
                    res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
                    res.status(201).json();
                }
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'server error'));
            }
        });
    }
    updateArtist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { name, nationality, music_styles } = req.body;
                const pool = req.pool;
                const rowUpdated = yield artist_1.artistService.updateArtist(parseInt(id), name, nationality, music_styles, pool, next);
                if (typeof rowUpdated === 'undefined') {
                    return;
                }
                else if (rowUpdated.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no artist found'));
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
    deleteArtist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pool = req.pool;
                const rowDeleted = yield artist_1.artistService.deleteArtist(parseInt(id), pool, next);
                if (typeof rowDeleted === 'undefined') {
                    return;
                }
                else if (rowDeleted.rowCount === 0) {
                    return next(new customError_1.CustomError(404, 'General', 'no artist found'));
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
exports.artistController = new ArtistController();
