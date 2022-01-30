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
exports.userRepository = void 0;
const SQLErrorHandler_1 = require("../middlewares/errors/SQLErrorHandler");
const customError_1 = require("../types/errors/customError");
class UserRepository {
    getUserIncluding(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = `
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
            ) u;`;
                const values = [id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    getUsersIncluding(pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = `
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
        ) u;`;
                return yield pool.query(text);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    createUser(username, password, email, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = "INSERT INTO mobile_app.users(username, password, email, role) VALUES ($1, $2, $3, $4) returning id;";
                const values = [username, password, email, "388e710f-5256-46e3-ab94-f6b0bfa2d87e"];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        case "23505":
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "username or email already exists");
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    updateUser(id, username, password, email, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = "UPDATE mobile_app.users set username=$1, password=$2, email=$3 WHERE id=$4;";
                const values = [username, password, email, id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
    deleteUser(id, pool, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = "DELETE FROM mobile_app.users WHERE id=$1;";
                const values = [id];
                return yield pool.query(text, values);
            }
            catch (err) {
                if ((0, SQLErrorHandler_1.instanceOfpgError)(err)) {
                    switch (err.code) {
                        default:
                            return (0, SQLErrorHandler_1.SQLErrorHandler)(next, "unknown error");
                    }
                }
                else {
                    return next(new customError_1.CustomError(500, "General", "internal server error from the PostgreSQL Server"));
                }
            }
        });
    }
}
exports.userRepository = new UserRepository();
