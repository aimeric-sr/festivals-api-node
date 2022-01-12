import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class Authenticate{
    authRole(roleGiven: string){
        return async (req: any, res: Response, next: NextFunction) => {
            const authHeader = req.headers['authorization'];
            if (authHeader===undefined){
                return res.status(403).json('no token provided');
            }
            const token = authHeader.split(' ')[1];
            if (token==null){
                return res.status(401).json('no token given after the Bearer keyword');
            }
            var refreshToken: string 
            if (process.env.ACCESS_TOKEN_SECRET) {
                refreshToken = process.env.ACCESS_TOKEN_SECRET
            }else {
                refreshToken = ""
            }
            
            jwt.verify(token, refreshToken, (err: any, user: any) => {
                if (err) {
                    return res.status(403).json('bad token');
                };
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

export const authenticate = new Authenticate();