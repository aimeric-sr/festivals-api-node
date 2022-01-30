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
exports.artistService = void 0;
const artist_1 = require("../repositories/artist");
const customError_1 = require("../types/errors/customError");
class ArtistService {
    getArtist(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return artist_1.artistRepository.getArtist(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    getArtists(pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return artist_1.artistRepository.getArtists(pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    createArtist(name, nationality, music_styles, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return artist_1.artistRepository.createArtist(name, nationality, music_styles, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    updateArtist(id, name, nationality, music_styles, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return artist_1.artistRepository.updateArtist(id, name, nationality, music_styles, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    deleteArtist(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return artist_1.artistRepository.deleteArtist(id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
}
exports.artistService = new ArtistService();
