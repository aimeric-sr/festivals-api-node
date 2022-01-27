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
exports.eventRepository = void 0;
const DBConnectionHandler_1 = require("../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
class EventRepository {
    getEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.events WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => err);
        });
    }
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.events;')
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    createEvent(name, location, started_date, finish_date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('INSERT INTO mobile_app.events(name, location, started_date, finish_date) VALUES ($1, $2, $3, $4) returning id;', [name, location, started_date, finish_date])
                .then(res => res)
                .catch(err => err);
        });
    }
    updateEvent(id, name, location, started_date, finish_date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('UPDATE mobile_app.events set name=$1, location=$2, started_date=$3, finish_date=$4 WHERE id=$5;', [name, location, started_date, finish_date, id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('DELETE FROM mobile_app.events WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
}
exports.eventRepository = new EventRepository();
