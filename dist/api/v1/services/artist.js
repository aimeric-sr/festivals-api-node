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
class ArtistService {
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_1.artistRepository.getArtist(id);
        });
    }
    getArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_1.artistRepository.getArtists();
        });
    }
    createArtist(name, nationality, music_styles) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_1.artistRepository.createArtist(name, nationality, music_styles);
        });
    }
    updateArtist(id, name, nationality, music_styles) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_1.artistRepository.updateArtist(id, name, nationality, music_styles);
        });
    }
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_1.artistRepository.deleteArtist(id);
        });
    }
}
exports.artistService = new ArtistService();
