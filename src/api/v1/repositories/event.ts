import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;
class EventRepository {
    async getEvent(id: number) {
        return await pool.query('SELECT * FROM mobile_app.events WHERE id=$1;',[id])
            .then(res => res)
            .catch(err => err);
    }

    async getEvents() {
        return await pool.query('SELECT * FROM mobile_app.events;')
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createEvent(name: string, location: string, started_date: string, finish_date: string) {
        return await pool.query('INSERT INTO mobile_app.events(name, location, started_date, finish_date) VALUES ($1, $2, $3, $4) returning id;',
            [name, location, started_date, finish_date])
            .then(res => res)
            .catch(err => err);
    }

    async updateEvent(id: number, name: string, location: string, started_date: string, finish_date: string) {
        return await pool.query('UPDATE mobile_app.events set name=$1, location=$2, started_date=$3, finish_date=$4 WHERE id=$5;',
            [name, location, started_date, finish_date, id])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async deleteEvent(id: number) {
        return await pool.query('DELETE FROM mobile_app.events WHERE id=$1;',
            [id])
            .then(res => res)
            .catch(err => console.log(err));
    }
}

export const eventRepository = new EventRepository();
