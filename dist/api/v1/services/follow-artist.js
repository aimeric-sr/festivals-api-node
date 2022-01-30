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
exports.followArtistService = void 0;
const follow_artist_1 = require("../repositories/follow-artist");
const customError_1 = require("../types/errors/customError");
class FollowArtistService {
    addFollowArtist(user_id, artist_id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return follow_artist_1.followArtistRepository.addFollowArtist(user_id, artist_id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
    delFollowArtist(user_id, artist_id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return follow_artist_1.followArtistRepository.delFollowArtist(user_id, artist_id, pool, next);
            }
            catch (err) {
                return next(new customError_1.CustomError(500, 'General', 'internal server error from the servie layout'));
            }
        });
    }
}
exports.followArtistService = new FollowArtistService();
