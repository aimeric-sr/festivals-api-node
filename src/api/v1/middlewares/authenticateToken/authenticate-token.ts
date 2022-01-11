import {NextFunction} from "express";

const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

class Authenticate{
    authRole(roleGiven: string){
        return async (req: any, res: any, next: NextFunction) => {
            const authHeader = req.headers['authorization'];
            if (authHeader===undefined){
                return res.status(403).json('no token provided');
            }
            const token = authHeader.split(' ')[1];
            if (token==null){
                return res.status(401).json('no token given after the Bearer keyword');
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json('bad token');
                }
                req.user = user;
                //can access all routes
                if(user.role==='ADMIN'){
                    next();
                    return;
                }
                if(user.role===roleGiven){
                    next();
                    return;
                }
                return res.status(401).json('unauthorized token');
            });
        }
    }
}

module.exports = new Authenticate();