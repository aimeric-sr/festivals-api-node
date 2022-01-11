import {pool} from '../../../config/database-connection';

class FollowEventRepository {
    async addFollowEvent(user_id: number, event_id: number) {
        return await pool.query('INSERT INTO public.follow_event(user_id, event_id) VALUES ($1, $2) returning user_id;',
            [user_id, event_id])
            .then(res => res)
            .catch(err => err);
    }

    async delFollowEvent(user_id: number, event_id: number) {
        return await pool.query('DELETE FROM public.follow_event WHERE user_id=$1 AND event_id=$2;',
            [user_id, event_id])
            .then(res => res)
            .catch(err => err);
    }
}

export const followEventRepository = new FollowEventRepository();
