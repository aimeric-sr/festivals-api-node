const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class Authenticate{

    async authenticateToken(req, res, next){
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
            next();
        });
    }
}

module.exports = new Authenticate();