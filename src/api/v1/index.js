const express = require('express');
const router = require('./routes');
const apiError = require('./middlewares/errors/api-error-handler');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.SERVERPORT;
app.use(express.json());
app.use('/v1',router);
app.use(apiError.errorHandler);

app.listen(port, () => console.log(`Server running on port ${port} .`));

