import {Request, Response, NextFunction} from "express"
import {followArtistService} from '../services/follow-artist';
import { CustomError } from '../responses/customError';

const dotenv = require('dotenv');
dotenv.config();

class FollowArtistController {
    async addFollowArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const {user_id, artist_id} = req.body;
            const rowCreated = await followArtistService.addFollowArtist(user_id, artist_id);
            res.location('https://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async delFollowArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const {user_id, artist_id} = req.body;
            const rowDeleted = await followArtistService.delFollowArtist(user_id, artist_id);
            if (rowDeleted.rowCount === 0) {
                return next(new CustomError(400, 'General', 'no result'));
            } else res.status(204).json();
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }
}

export const followArtistController = new FollowArtistController();