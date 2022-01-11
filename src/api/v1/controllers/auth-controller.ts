const authService = require("../services/auth-service");
const ApiError = require("../middlewares/errors/api-error");

class AuthController {
    async login(req, res, next) {
        try {
            console.log(req.body)
            const {username, password} = req.body;
            const user = await authService.login(username, password);
            if (user.rowCount === 0) {
                next(ApiError.notFound('no user found with this username, please try another'));
            }
            if (user.isConnected === true) {
                res.status(200).json({accessToken: user.accessToken, refreshToken: user.refreshToken});
            } else {
                next(ApiError.badRequest('wrong password, please try another'));
            }
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getToken(req, res, next) {
        try {
            const refreshToken = req.body.refreshToken;
            const accessToken = await authService.getAccessToken(refreshToken);
            if (accessToken.rowCount === 0) {
                next(ApiError.notFound('no refresh_token find, please try another'));
            } else {
                res.status(200).json({accessToken: accessToken.accessToken});
            }
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.body.refreshToken;
            const deletedToken = await authService.logout(refreshToken);
            if (deletedToken.rowCount === 0) {
                next(ApiError.notFound('no refresh token find, can\'t delete it'));
            } else {
                res.status(204).json();
            }
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new AuthController();