import {Request, Response, NextFunction} from "express"
import {authService} from "../services/auth";
import { CustomError } from '../responses/customError';


class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const {username, password} = req.body;
            const user: any = await authService.login(username, password);
            if (user.rowCount === 0) {
                return next(new CustomError(404, 'General', 'bad username'));
            }
            if (user.isConnected === true) {
                res.status(200).json({accessToken: user.accessToken, refreshToken: user.refreshToken});
            } else {
                return next(new CustomError(400, 'General', 'wrong password'));
            }
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async getToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.body.refreshToken;
            const accessToken = await authService.getAccessToken(refreshToken);
            if (accessToken.rowCount === 0) {
                return next(new CustomError(404, 'General', 'no refresh token find'));
            } else {
                res.status(200).json({accessToken: accessToken.accessToken});
            }
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.body.refreshToken;
            const deletedToken: any = await authService.logout(refreshToken);
            if (deletedToken.rowCount === 0) {
                return next(new CustomError(404, 'General', 'no refresh token find'));
            } else {
                res.status(204).json();
            }
        } catch (err) {
            return next(new CustomError(500, 'General', 'server error'));
        }
    }
}

export const authController = new AuthController();