import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './controllers/DBController';
import { login, signup } from './controllers/AuthControllers';
import { details } from './controllers/DetailsController';
import { verifyToken } from './controllers/AuthMiddleware';
import cookieParser from 'cookie-parser';
import { therapistData } from './controllers/TherapistDataController';

// ✅ Correct Apollo package
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ✅ REST routes
app.get('/', (req: Request, res: Response) => { res.send('Hello World!') });
app.post('/signup', signup);
app.post('/signin', login);
app.post('/details', verifyToken, details);
app.post('/therapistData', therapistData);

// ✅ Apollo + Express combined
const startApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 REST server running at http://localhost:${port}`);
    console.log(`🚀 GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

startApolloServer();
