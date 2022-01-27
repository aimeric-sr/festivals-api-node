import {Request, Response, NextFunction} from "express"
import {eventService} from '../services/event';
import { CustomError } from '../responses/customError';

const dotenv = require('dotenv');
dotenv.config();

class EventController {
    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await eventService.getEvent(parseInt(id));
            if (user.code === '22P02') {
                return next(new CustomError(404, 'General', 'wrong uuid'));
            }
            if (user.rows.length === 0) {
                return next(new CustomError(404, 'General', 'wrong uuid'));
            }else res.status(200).json(user.rows[0]);
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const users: any = await eventService.getEvents();
            if (users.rows.length === 0) {
                return next(new CustomError(404, 'General', 'wrong uuid'));
            } else {
                res.status(200).json(users.rows);
            }
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, location, started_date, finish_date} = req.body;
            const rowCreated = await eventService.createEvent(name, location, started_date, finish_date);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const {name, location, started_date, finish_date} = req.body;
            const rowUpdated: any = await eventService.updateEvent(parseInt(id), name, location, started_date, finish_date);
            if (rowUpdated.rowCount === 0) {
                return next(new CustomError(404, 'General', 'wrong uuid'));
            } else res.status(200).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rowDeleted: any = await eventService.deleteEvent(parseInt(id));
            if (rowDeleted.rowCount === 0) {
                return next(new CustomError(404, 'General', 'wrong uuid'));
            } else res.status(204).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }
}

export const eventController = new EventController();