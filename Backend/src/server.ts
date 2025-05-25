import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

import connectDB from './controllers/DBController';
import { login, signup } from './controllers/AuthControllers';
import { details } from './controllers/DetailsController';
import { verifyToken } from './controllers/AuthMiddleware';
import { therapistData } from './controllers/TherapistDataController';
import { bookSession } from './controllers/sessionManager';

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(bodyParser.json());

// ✅ REST routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.post('/signup', signup);
app.post('/signin', login);
app.post('/details', verifyToken, details);
app.post('/therapistData', therapistData);
app.post('/bookSession', bookSession)

// ✅ Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 REST API ready at http://localhost:${port}`);
    console.log(`🚀 GraphQL ready at http://localhost:${port}/graphql`);
  });
}

startServer();
