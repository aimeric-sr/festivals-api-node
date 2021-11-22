//gestion manuel des erreurs pour éviter les fuites de données
// ou de renvoyer des informations sensibles à l'utilisateur
const ApiError = require("./api-error");

function apiErrorHandler(err, req, res) {
    //just in dev, not in prod because console.error isn't async
    console.log(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;