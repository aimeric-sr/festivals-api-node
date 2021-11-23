const authRepository = require("../repositories/auth-repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

class AuthService {
    async login(username, password) {
        const user = await authRepository.getUserByUsername(username);
        if (user.rowCount === 0) {
            return user;
        } else {
            if (await bcrypt.compare(password, user.rows[0].password)) {
                const userToken = { id : user.rows[0].id };
                const accessToken = jwt.sign(userToken, env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
                return { isConnected : true, accessToken : accessToken};

            } else {
                return { isConnected : false };
            }
        }
    }
}

module.exports = new AuthService();

