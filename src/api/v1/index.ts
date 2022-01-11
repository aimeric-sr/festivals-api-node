import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req , res ) => {
    res.send('Server running with TypeScript !');
})

app.listen(port, () => console.log(`Server running on port ${port} .`));