import express, { Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './controllers/DBController';
import { login, signup } from './controllers/AuthControllers';
import { details } from './controllers/DetailsController';
import { verifyToken } from './controllers/AuthMiddleware';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {res.send('Hello World!')});
app.post('/signup', signup);
app.post('/signin', login);
app.post('/details', verifyToken, details);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
