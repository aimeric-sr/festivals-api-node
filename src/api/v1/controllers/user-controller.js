const ApiError = require('../middlewares/errors/api-error');
const userService = require('../services/user-service');
const dotenv = require('dotenv');

dotenv.config();

class UserController {
    async getUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(id);
            res.status(200).json(user.rows[0]);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getUsers(req, res, next) {
        try {
            const allUsers = await userService.getUsers();
            res.status(200).json(allUsers.rows);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async createUser(req, res, next) {
        try {
            const {username, password, email} = req.body;
            const userInserted = await userService.createUser(username, password, email);
            res.status(201).json(userInserted);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const {username, password, email} = req.body;
            const userUpdated = await userService.updateUser(id, username, password, email);
            res.status(200).json(userUpdated);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const userDeleted = await userService.deleteUser(id);
            res.status(204).json(userDeleted);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new UserController();
