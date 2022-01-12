import {Request, Response, NextFunction} from "express"
import {eventService} from '../services/event-service';
import ApiError from '../middlewares/errors/api-error';

const dotenv = require('dotenv');
dotenv.config();

class EventController {
    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await eventService.getEvent(parseInt(id));
            if (user.code === '22P02') {
                next(ApiError.badRequest('wrong format identifier for event UUID'));
            }
            if (user.rows.length === 0) {
                next(ApiError.notFound('no event found with this id'));
            }else res.status(200).json(user.rows[0]);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const users: any = await eventService.getEvents();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no events found'));
            } else {
                res.status(200).json(users.rows);
            }
        } catch (err) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, location, started_date, finish_date} = req.body;
            const rowCreated = await eventService.createEvent(name, location, started_date, finish_date);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const {name, location, started_date, finish_date} = req.body;
            const rowUpdated: any = await eventService.updateEvent(parseInt(id), name, location, started_date, finish_date);
            if (rowUpdated.rowCount === 0) {
                next(ApiError.notFound('no event found with this id, can\'t update it'));
            } else res.status(200).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rowDeleted: any = await eventService.deleteEvent(parseInt(id));
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no event found with this id, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

export const eventController = new EventController();