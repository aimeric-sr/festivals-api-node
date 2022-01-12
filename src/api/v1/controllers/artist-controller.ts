import {Request, Response, NextFunction} from "express"
import {artistService} from '../services/artist-service';
import ApiError from '../middlewares/errors/api-error';

const dotenv = require('dotenv');
dotenv.config();

class ArtistController {
    async getArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;
            const user = await artistService.getArtist(parseInt(id));
            if (user.code === '22P02') {
                next(ApiError.badRequest('wrong format identifier for artist UUID'));
            }
            if (user.rows.length === 0) {
                next(ApiError.notFound('no artist found with this id'));
            }else res.status(200).json(user.rows[0]);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getArtists(req: Request, res: Response, next: NextFunction) {
        try {
            const users: any = await artistService.getArtists();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no artists found'));
            } else {
                res.status(200).json(users.rows);
            }
        } catch (err) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async createArtist(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const {name, nationality, music_styles} = req.body;
            const rowCreated = await artistService.createArtist(name, nationality, music_styles);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async updateArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const {name, nationality, music_styles} = req.body;
            const rowUpdated: any = await artistService.updateArtist(parseInt(id), name, nationality, music_styles);
            if (rowUpdated.rowCount === 0) {
                next(ApiError.notFound('no artist found with this id, can\'t update it'));
            } else res.status(200).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async deleteArtist(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rowDeleted: any = await artistService.deleteArtist(parseInt(id));
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no artist found with this id, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

export const artistController = new ArtistController();