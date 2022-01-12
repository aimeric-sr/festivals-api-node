import {Request, Response, NextFunction} from "express"
import {followArtistService} from '../services/follow-artist-service';
import ApiError from '../middlewares/errors/api-error';

const dotenv = require('dotenv');
dotenv.config();

class FollowArtistController {
    async addFollowArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const {user_id, artist_id} = req.body;
            const rowCreated = await followArtistService.addFollowArtist(user_id, artist_id);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async delFollowArtist(req: Request, res: Response, next: NextFunction) {
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

export const followArtistController = new FollowArtistController();