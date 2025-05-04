import express, { Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './controllers/DBController';
import { signup } from './controllers/AuthControllers';

// Load environment variables from a .env file
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {res.send('Hello World!')});
app.post('/login', signup);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
