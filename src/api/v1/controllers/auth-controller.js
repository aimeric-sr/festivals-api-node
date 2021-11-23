const authService = require("../services/auth-service");
const ApiError = require("../middlewares/errors/api-error");

class AuthController{
    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            if (user.rowCount === 0) {
                next(ApiError.notFound('no user found with this username, please try another'));
            }
            if (user.isConnected === true) {
                res.status(200).json({accessToken: user.accessToken});
            } else {
                next(ApiError.badRequest('wrong password, please try another'));
            }
        } catch (err) {
            console.log(err);
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new AuthController();