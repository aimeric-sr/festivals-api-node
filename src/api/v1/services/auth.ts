import {authRepository} from '../repositories/auth';

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
    async login(username: string, password: string) {
        const user: any = await authRepository.getUserByUsername(username);
        if (user.rowCount === 0) {
            return user;
        } else {
            if (await bcrypt.compare(password, user.rows[0].password)) {

                const userToken = {id: user.rows[0].id, role: user.rows[0].name};
                const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
                const refreshToken = jwt.sign(userToken, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION});

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
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
                if (err) {
                    console.log(err);
                }
                currentAccessToken = jwt.sign({id: user.id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
            })
            return {isConnected: true, accessToken: currentAccessToken, rowCount: 1};
        }
    }

    async logout(refreshToken: string) {
        return authRepository.deleteRefreshToken(refreshToken);
    }
}

export const authService = new AuthService();


