import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;
class FollowArtistRepository {
    async addFollowArtist(user_id: number, artist_id: number) {
        return await pool.query('INSERT INTO mobile_app.follow_artist(user_id, artist_id) VALUES ($1, $2) returning user_id;',
            [user_id, artist_id])
            .then(res => res)
            .catch(err => err);
    }

    async delFollowArtist(user_id: number, artist_id: number) {
        return await pool.query('DELETE FROM mobile_app.follow_artist WHERE user_id=$1 AND artist_id=$2;',
            [user_id, artist_id])
            .then(res => res)
            .catch(err => err);
    }
}

export const followArtistRepository = new FollowArtistRepository();