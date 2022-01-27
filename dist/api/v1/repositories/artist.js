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
exports.artistRepository = void 0;
const DBConnectionHandler_1 = require("../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
class ArtistRepository {
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.artists WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => err);
        });
    }
    getArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.artists;')
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    createArtist(name, nationality, music_styles) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('INSERT INTO mobile_app.artists(name, nationality, music_styles) VALUES ($1, $2, $3) returning id;', [name, nationality, music_styles])
                .then(res => res)
                .catch(err => err);
        });
    }
    updateArtist(id, name, nationality, music_styles) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('UPDATE mobile_app.artists set name=$1, nationality=$2, music_styles=$3 WHERE id=$4;', [name, nationality, music_styles, id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('DELETE FROM mobile_app.artists WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
}
exports.artistRepository = new ArtistRepository();
