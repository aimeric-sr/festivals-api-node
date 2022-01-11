const followEventService = require('../services/follow-event-service');
const ApiError = require('../middlewares/errors/api-error');
const dotenv = require('dotenv');
dotenv.config();

class FollowEventController {
    async addFollowEvent(req, res, next) {
        try {
            const {user_id, event_id} = req.body;
            const rowCreated = await followEventService.addFollowEvent(user_id, event_id);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError(err));
        }
    }

    async delFollowEvent(req, res, next) {
        try {
            const {user_id, event_id} = req.body;
            const rowDeleted = await followEventService.delFollowEvent(user_id, event_id);
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no follow find with these ids, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new FollowEventController();