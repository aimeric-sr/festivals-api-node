const userService = require('../services/user-service');
const ApiError = require('../middlewares/errors/api-error');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    async getUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(id);
            if (user.rows.length === 0) {
                next(ApiError.notFound('no user found with this id, can\'t get a user'));
            } else res.status(200).json(user.rows[0]);
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            if (users.rows.length === 0) {
                next(ApiError.notFound('no users found'));
            } else {
                res.status(200).json(users.rows);
            }
        } catch (err) {
            console.log(err.message);
            next(ApiError.internalServerError(err.message));
        }
    }

    async createUser(req, res, next) {
        try {
            console.log(req.body);
            const {username, password, email} = req.body;
            const rowCreated = await userService.createUser(username, password, email);
            res.location('http://' + process.env.PGHOST + ':' + process.env.SERVERPORT + req.originalUrl + '/' + rowCreated.rows[0].id);
            res.status(201).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const {username, password, email} = req.body;
            const rowUpdated = await userService.updateUser(id, username, password, email);
            if (rowUpdated.rowCount === 0) {
                next(ApiError.notFound('no user found with this id, can\'t update it'));
            } else res.status(200).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const rowDeleted = await userService.deleteUser(id);
            if (rowDeleted.rowCount === 0) {
                next(ApiError.notFound('no user found with this id, can\'t delete it'));
            } else res.status(204).json();
        } catch (err) {
            next(ApiError.internalServerError('internal server error, try to contact administrators'));
        }
    }
}

module.exports = new UserController();