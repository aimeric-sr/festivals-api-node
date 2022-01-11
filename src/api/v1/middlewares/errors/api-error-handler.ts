//gestion manuel des erreurs pour éviter les fuites de données
// ou de renvoyer des informations sensibles à l'utilisateur
const ApiError = require("./api-error");

class ApiErrorHandler{
    async errorHandler(err, req, res, next) {
        //just in dev, not in prod because console.error isn't async
        console.log(err);

        if (err instanceof ApiError) {
            res.status(err.code).json(err.message);
            next();
            return;
        }

        res.status(500).json('something went wrong');
        next();
    }
}

module.exports = new ApiErrorHandler();