import { Pool } from 'pg';
import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;

export class UserRepository {
    async getUser(id: number) {
        return await pool.query('SELECT * FROM mobile_app.users WHERE id=$1;',[id])
            .then(res => res)
            .catch(err => err);
    }

    async getUserIncluding(id: number) {
        return await pool.query(`
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
            ) u;`,[id])
            .then(res => res)
            .catch(err => err);
    }

    async getUsers() {
        return await pool.query('SELECT * FROM mobile_app.users;')
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async getUsersIncludingArtists() {
        return await pool.query(`
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
    }

    async getUsersIncludingEvents() {
        return await pool.query(`
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
    }

    async getUsersIncluding() {
        return await pool.query(`
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
    }

    async createUser(poolAdmin: Pool, username: string, password: string, email: string) {

        
        return await poolAdmin.query('INSERT INTO mobile_app.users(username, password, email, role) VALUES ($1, $2, $3, $4) returning id;',
            [username, password, email, '388e710f-5256-46e3-ab94-f6b0bfa2d87e'])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async updateUser(id: number, username: string, password: string, email: string) {
        return await pool.query('UPDATE mobile_app.users set username=$1, password=$2, email=$3 WHERE id=$4;',
            [username, password, email, id])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async deleteUser(id: number) {
        return await pool.query('DELETE FROM mobile_app.users WHERE id=$1;',
            [id])
            .then(res => res)
            .catch(err => console.log(err));
    }
}
