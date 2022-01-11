const followArtistService = require('../services/follow-artist-service');
const ApiError = require('../middlewares/errors/api-error');
const dotenv = require('dotenv');
dotenv.config();

class FollowArtistController {
    async addFollowArtist(req, res, next) {
        try {
            const {user_id, artist_id} = req.body;
            const rowCreated = await followArtistService.addFollowArtist(user_id, artist_id);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async delFollowArtist(req, res, next) {
        try {
            const {user_id, artist_id} = req.body;
            const rowDeleted = await followArtistService.delFollowArtist(user_id, artist_id);
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no follow find with these ids, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new FollowArtistController();