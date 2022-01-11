import express, {Router} from 'express';
import v1 from './routes';
const apiError = require('./middlewares/errors/api-error-handler');
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const router = Router()

app.use(express.json());
app.use('/v1',v1);
app.use(apiError.errorHandler);

app.get('/', (req , res ) => {
    res.send('Server running with TypeScript !');
})

app.listen(port, () => console.log(`Server running on port ${port} .`));