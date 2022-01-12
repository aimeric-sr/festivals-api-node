import {authRepository} from '../repositories/auth-repository';

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

class AuthService {
    async login(username: string, password: string) {
        const user: any = await authRepository.getUserByUsername(username);
        if (user.rowCount === 0) {
            return user;
        } else {
            if (await bcrypt.compare(password, user.rows[0].password)) {

                const userToken = {id: user.rows[0].id, role: user.rows[0].name};
                const accessToken = jwt.sign(userToken, env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
                const refreshToken = jwt.sign(userToken, env.REFRESH_TOKEN_SECRET);

                await authRepository.createToken(refreshToken);
                return {isConnected: true, accessToken: accessToken, refreshToken: refreshToken};

            } else {
                return {isConnected: false};
            }
        }
    }

    async getAccessToken(refreshToken: string) {
        const resAccessToken: any = await authRepository.searchRefreshToken(refreshToken);
        let currentAccessToken=null;
        if (resAccessToken.rowCount === 0) {
            return {rowCount: 0};
        } else {
            jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
                if (err) {
                    console.log(err);
                }
                currentAccessToken = jwt.sign({id: user.id, role: user.role}, env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            })
            return {isConnected: true, accessToken: currentAccessToken, rowCount: 1};
        }
    }

    async logout(refreshToken: string) {
        return authRepository.deleteRefreshToken(refreshToken);
    }
}

export const authService = new AuthService();


