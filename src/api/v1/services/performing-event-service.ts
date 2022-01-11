import {performingEventRepository} from '../repositories/performing-event-repository';

class PerformingEventService {
    async addPerformingEvent(artist_id: number, event_id: number) {
        return performingEventRepository.addPerformingEvent(artist_id, event_id);
    }

    async delPerformingEvent(artist_id: number, event_id: number) {
        return performingEventRepository.delPerformingEvent(artist_id, event_id);
    }
}

export const performingEventService = new PerformingEventService();
