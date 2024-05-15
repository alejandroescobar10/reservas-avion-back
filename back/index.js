import {connectDB} from './db.js'
import express from 'express';
import morgan from 'morgan';
import paisesRoutes from './routes/paises.routes.js'
import cors  from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/v1', paisesRoutes)

const PORT =process.env.PORT || 3000;
connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})