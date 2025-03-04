import 'dotenv/config';
import express from 'express';
import connectDb from './utils/db.js';
import authRouter from './router/auth-router.js';
import homeRouter from './router/home-router.js';
import errorMiddleware from './middlewares/error-middleware.js';
import authMiddleware from "./middlewares/auth-middleware.js";
import profileRouter from "./router/profile-router.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT;

var corsOptions = {
    origin: 'http://localhost:5173',
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/home',authMiddleware,homeRouter);
app.use('/api/getProfile',authMiddleware,profileRouter);

app.use(errorMiddleware);


connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`);
    });
});

