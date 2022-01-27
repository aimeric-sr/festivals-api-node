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
exports.performingEventRepository = void 0;
const DBConnectionHandler_1 = require("../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
class PerformingEventRepository {
    addPerformingEvent(artist_id, event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('INSERT INTO mobile_app.performing_event(artist_id, event_id) VALUES ($1, $2) returning artist_id;', [artist_id, event_id])
                .then(res => res)
                .catch(err => err);
        });
    }
    delPerformingEvent(artist_id, event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('DELETE FROM mobile_app.performing_event WHERE artist_id=$1 AND event_id=$2;', [artist_id, event_id])
                .then(res => res)
                .catch(err => err);
        });
    }
}
exports.performingEventRepository = new PerformingEventRepository();
