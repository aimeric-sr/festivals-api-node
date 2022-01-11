const performingEventService = require('../services/performing-event-service');
const ApiError = require('../middlewares/errors/api-error');
const dotenv = require('dotenv');
dotenv.config();

class PerformingEventController {
    async addPerformingEvent(req, res, next) {
        try {
            const {artist_id, event_id} = req.body;
            const rowCreated = await performingEventService.addPerformingEvent(artist_id, event_id);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async delPerformingEvent(req, res, next) {
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

module.exports = new PerformingEventController();