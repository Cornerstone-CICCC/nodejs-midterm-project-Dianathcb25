import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pageRouter from './routes/page.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import experimentRouter from './routes/experiment.routes';
import subjectRouter from './routes/subject.routes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:4321'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/experiments', experimentRouter);
app.use('/experiments/:experimentId/subject', subjectRouter);
app.use('/', pageRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route.');
});

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('Missing port!');
}
app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT} `);
});
