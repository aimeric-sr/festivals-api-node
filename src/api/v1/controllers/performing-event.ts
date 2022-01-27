import {Request, Response, NextFunction} from "express"
import {performingEventService} from '../services/performing-event';
import { CustomError } from '../responses/customError';

const dotenv = require('dotenv');
dotenv.config();

class PerformingEventController {
    async addPerformingEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const {artist_id, event_id} = req.body;
            const rowCreated = await performingEventService.addPerformingEvent(artist_id, event_id);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async delPerformingEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const {artist_id, event_id} = req.body;
            const rowDeleted = await performingEventService.delPerformingEvent(artist_id, event_id);
            if (rowDeleted.rowCount === 0) {
                return next(new CustomError(404, 'General', 'no follow find with these ids, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }
}

export const performingEventController = new PerformingEventController();