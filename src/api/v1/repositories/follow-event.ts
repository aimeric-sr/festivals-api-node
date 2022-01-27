import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;
class FollowEventRepository {
    async addFollowEvent(user_id: number, event_id: number) {
        return await pool.query('INSERT INTO mobile_app.follow_event(user_id, event_id) VALUES ($1, $2) returning user_id;',
            [user_id, event_id])
            .then(res => res)
            .catch(err => err);
    }

    async delFollowEvent(user_id: number, event_id: number) {
        return await pool.query('DELETE FROM mobile_app.follow_event WHERE user_id=$1 AND event_id=$2;',
            [user_id, event_id])
            .then(res => res)
            .catch(err => err);
    }
}

export const followEventRepository = new FollowEventRepository();
