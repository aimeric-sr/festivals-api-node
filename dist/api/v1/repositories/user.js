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
exports.UserRepository = void 0;
const DBConnectionHandler_1 = require("../../../DBConnection/FestivalsDatabase/DBConnectionHandler");
const pool = DBConnectionHandler_1.DBConnectionHandler.getInstance().getAdminPoolConnection;
class UserRepository {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.users WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => err);
        });
    }
    getUserIncluding(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query(`
            select row_to_json(u)
            from (select id,password,email,
                (select array_to_json(array_agg(row_to_json(e)))
                from (select id, name, location, started_date, finish_date
                    from follow_event
                    inner join events
                    on follow_event.event_id = events.id
                    where user_id = users.id
                ) e
                ) as events,
                (select array_to_json(array_agg(row_to_json(a)))
                 from (select id, name, nationality, music_styles
                    from follow_artist
                    inner join artists
                    on follow_artist.artist_id = artists.id
                    where user_id = users.id
                ) a
                ) as artists
            from users
            where id = $1
            ) u;`, [id])
                .then(res => res)
                .catch(err => err);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('SELECT * FROM mobile_app.users;')
                .then(res => res)
                .catch(err => console.log(err.message));
        });
    }
    getUsersIncludingArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query(`
            select array_to_json (array_agg(row_to_json(u)))
            from (select id, password, email,(
                select array_to_json(array_agg(row_to_json(a)))
                from (select id, name, nationality, music_styles
                    from follow_artist
                    inner join artists
                    on follow_artist.artist_id = artists.id
                    where user_id=users.id
                ) a
            ) as artists
            from users
            ) u;`)
                .then(res => res)
                .catch(err => err);
        });
    }
    getUsersIncludingEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query(`
            select array_to_json(array_agg(row_to_json(u)))
            from (select id, password, email,(
                select array_to_json(array_agg(row_to_json(e)))
                from (select id, name, location, started_date, finish_date
                    from follow_event
                    inner join events
                    on follow_event.event_id = events.id
                    where user_id = users.id
                ) e
            ) as events
            from users
            ) u;`)
                .then(res => res)
                .catch(err => err);
        });
    }
    getUsersIncluding() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query(`
            select array_to_json(array_agg(row_to_json(u)))
            from (select id, password, email,
                 (select array_to_json(array_agg(row_to_json(e)))
                    from (select id, name, location, started_date, finish_date
                        from follow_event
                        inner join events
                        on follow_event.event_id = events.id
                        where user_id = users.id
                     ) e
                ) as events,
                (select array_to_json(array_agg(row_to_json(a)))
                    from (select id, name, nationality, music_styles
                        from follow_artist
                        inner join artists
                        on follow_artist.artist_id = artists.id
                        where user_id = users.id
                    ) a
                ) as artists
            from users
        ) u;`)
                .then(res => res)
                .catch(err => err);
        });
    }
    createUser(poolAdmin, username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield poolAdmin.query('INSERT INTO mobile_app.users(username, password, email, role) VALUES ($1, $2, $3, $4) returning id;', [username, password, email, '388e710f-5256-46e3-ab94-f6b0bfa2d87e'])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
    updateUser(id, username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('UPDATE mobile_app.users set username=$1, password=$2, email=$3 WHERE id=$4;', [username, password, email, id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pool.query('DELETE FROM mobile_app.users WHERE id=$1;', [id])
                .then(res => res)
                .catch(err => console.log(err));
        });
    }
}
exports.UserRepository = UserRepository;
