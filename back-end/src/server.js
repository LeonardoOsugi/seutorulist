import express from 'espress';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors())
.use(express.json())


app.listen(8000, () => console.log('running in port: 8000'));