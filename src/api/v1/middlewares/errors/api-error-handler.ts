//gestion manuel des erreurs pour éviter les fuites de données
// ou de renvoyer des informations sensibles à l'utilisateur
import ApiError from "./api-error";
import {Request, Response, NextFunction} from "express"



class ApiErrorHandler{
    async errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        //just in dev, not in prod because console.error isn't async
        console.log(err);

        if (err instanceof ApiError) {
            res.status(err.code).json(err.message);
            next();
            return;
        }

        res.status(500).json('something went wrong');
        next();
    }
}

export const apiErrorHandler = new ApiErrorHandler();