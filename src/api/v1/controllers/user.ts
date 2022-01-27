import {Request, Response, NextFunction} from "express"
import {userService} from '../services/user';
import { CustomError } from '../responses/customError';

const dotenv = require('dotenv');
dotenv.config();

class UserController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(parseInt(id));
            if (user.code === '22P02') {
                return next(new CustomError(404, 'General', 'bad request'));
            }
            if (user.rows.length === 0) {
                return next(new CustomError(404, 'General', 'bad request'));
            }else res.status(200).json(user.rows[0]);
        } catch (err: any) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async getUserIncluding(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getUserIncluding(parseInt(id));
            if (user.code === '22P02') {
                return next(new CustomError(404, 'General', 'bad request'));
            }
            if (user.rows.length === 0) {
                return next(new CustomError(404, 'General', 'bad request'));
            }else res.status(200).json(user.rows[0].row_to_json);
        } catch (err: any) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            if(users){
                if(users.rowCount === 0){
                    return next(new CustomError(404, 'General', 'bad request'));
                }else {
                    res.status(200).json(users.rows);
                }
            }
            
        } catch (err) {
            return next(new CustomError(500, 'General', 'bad request'));
        }
    }

    async getUsersIncludingArtists(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncludingArtists();
            if (users.rows.length === 0) {
                return next(new CustomError(404, 'General', 'bad request'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }
        } catch (err: any) {
            return next(new CustomError(500, 'General', 'bad request'));
        }
    }

    async getUsersIncludingEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncludingEvents();
            if (users.rows.length === 0) {
                return next(new CustomError(404, 'General', 'bad request'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }

        } catch (err) {
            return next(new CustomError(404, 'General', 'bad request'));
        }
    }

    async getUsersIncluding(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsersIncluding();
            if (users.rows.length === 0) {
                return next(new CustomError(404, 'General', 'bad request'));
            } else {
                res.status(200).json(users.rows[0].array_to_json);
            }
        } catch (err: any) {
            return next(new CustomError(404, 'General', 'bad request'));
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password, email} = req.body;
            console.log(req.pool);
            const rowCreated = await userService.createUser(req.pool, username, password, email);
            console.log(rowCreated);
            
            //res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + //rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err: any) {
            console.log(err);
            
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const {username, password, email} = req.body;
            const rowUpdated = await userService.updateUser(parseInt(id), username, password, email);
            if(rowUpdated && rowUpdated.rowCount === 0){
                return next(new CustomError(404, 'General', 'bad request'));
            }else {
                res.status(200).json();
            }
        } catch (err: any) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rowDeleted = await userService.deleteUser(parseInt(id));
            if(rowDeleted && rowDeleted.rowCount === 0){
                return next(new CustomError(404, 'General', 'bad request'));
            }else {
                res.status(204).json();
            }
        } catch (err: any) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }
}

export const userController = new UserController();