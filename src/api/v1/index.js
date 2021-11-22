const express = require('express');
const router = require('./routes');
const apiErrorHandler = require('./middlewares/errors/api-error-handler');

const app = express();

app.use(express.json());
app.use('/v1',router);
app.use(apiErrorHandler);

app.listen(8080, () => console.log(`Server running on port ${8080} .`));

