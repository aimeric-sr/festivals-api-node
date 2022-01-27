import {eventRepository} from '../repositories/event';

class EventService {
    async getEvent(id: number) {
        return eventRepository.getEvent(id);
    }

    async getEvents() {
        return eventRepository.getEvents();
    }

    async createEvent(name: string, location: string, started_date: string, finish_date: string) {
        return eventRepository.createEvent(name, location, started_date, finish_date);
    }

    async updateEvent(id: number, name: string, location: string, started_date: string, finish_date: string) {
        return eventRepository.updateEvent(id, name, location, started_date, finish_date);
    }

    async deleteEvent(id: number) {
        return eventRepository.deleteEvent(id);
    }
}

export const eventService = new EventService();
