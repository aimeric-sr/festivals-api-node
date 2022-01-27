import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;
class PerformingEventRepository {
    async addPerformingEvent(artist_id: number, event_id: number) {
        return await pool.query('INSERT INTO mobile_app.performing_event(artist_id, event_id) VALUES ($1, $2) returning artist_id;',
            [artist_id, event_id])
            .then(res => res)
            .catch(err => err);
    }

    async delPerformingEvent(artist_id: number, event_id: number) {
        return await pool.query('DELETE FROM mobile_app.performing_event WHERE artist_id=$1 AND event_id=$2;',
            [artist_id, event_id])
            .then(res => res)
            .catch(err => err);
    }
}

export const performingEventRepository = new PerformingEventRepository();
