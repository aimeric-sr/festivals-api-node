import express, { Request, Response} from 'express';
import { routerV1 } from './v1/routes/index';
import { errorHandler } from './v1/middlewares/errors/errorHandler';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/v1',routerV1);
app.use(errorHandler);


var rootMessage: string 
if(process.env.NODE_ENV === "DEV"){
    rootMessage = `Server running on port ${port} in development .`
}else if(process.env.NODE_ENV === "PROD"){
    rootMessage = `Server running on port ${port} in production .`
}

app.get('/', (req: Request , res: Response ) => {
    res.send(rootMessage);
})

app.listen(port, () => console.log(rootMessage));