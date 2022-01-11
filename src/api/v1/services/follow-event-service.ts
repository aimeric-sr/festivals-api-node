import {followEventRepository} from '../repositories/follow-event-repository';

class FollowEventService {
    async addFollowEvent(user_id: number, event_id: number) {
        return followEventRepository.addFollowEvent(user_id, event_id);
    }

    async delFollowEvent(user_id: number, event_id: number) {
        return followEventRepository.delFollowEvent(user_id, event_id);
    }
}

export const followEventService = new FollowEventService();
