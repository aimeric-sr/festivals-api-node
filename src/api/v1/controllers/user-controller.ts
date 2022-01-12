import {Request, Response, NextFunction} from "express"
import {userService} from '../services/user-service';
import ApiError from '../middlewares/errors/api-error';

const dotenv = require('dotenv');
dotenv.config();

class UserController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(parseInt(id));
            if (user.code === '22P02') {
                next(ApiError.badRequest('wrong format identifier for user UUID'));
            }
            if (user.rows.length === 0) {
                next(ApiError.notFound('no user found with this id, can\'t get a user'));
            }else res.status(200).json(user.rows[0]);
        } catch (err: any) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getUserIncluding(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getUserIncluding(parseInt(id));
            if (user.code === '22P02') {
                next(ApiError.badRequest('wrong format identifier for user UUID'));
            }
            if (user.rows.length === 0) {
                next(ApiError.notFound('no user found with this id, can\'t get a user'));
            }else res.status(200).json(user.rows[0].row_to_json);
        } catch (err: any) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no users found'));
            } else {
                res.status(200).json(users.rows);
            }
        } catch (err: any) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async getUsersIncludingArtists(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncludingArtists();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no users found'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }
        } catch (err: any) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async getUsersIncludingEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncludingEvents();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no users found'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }

        } catch (err: any) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async getUsersIncluding(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncluding();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no users found'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }
        } catch (err: any) {
            next(ApiError.internalServerError(err.message));
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const {username, password, email} = req.body;
            const rowCreated = await userService.createUser(username, password, email);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err: any) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const {username, password, email} = req.body;
            const rowUpdated = await userService.updateUser(parseInt(id), username, password, email);
            if (rowUpdated.rowCount === 0) {
                next(ApiError.notFound('no user found with this id, can\'t update it'));
            } else res.status(200).json();
        } catch (err: any) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rowDeleted = await userService.deleteUser(parseInt(id));
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no user found with this id, can\'t delete it'));
            } else res.status(204).json();
        } catch (err: any) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

export const userController = new UserController();