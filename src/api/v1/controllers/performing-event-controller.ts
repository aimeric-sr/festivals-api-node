import {Request, Response, NextFunction} from "express"
import {performingEventService} from '../services/performing-event-service';
import ApiError from '../middlewares/errors/api-error';

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
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async delPerformingEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const {artist_id, event_id} = req.body;
            const rowDeleted = await performingEventService.delPerformingEvent(artist_id, event_id);
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no follow find with these ids, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

export const performingEventController = new PerformingEventController();