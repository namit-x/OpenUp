import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

import connectDB from './controllers/DBController';
import { login, logout, signup } from './controllers/AuthControllers';
import { details } from './controllers/DetailsController';
import { verifyToken } from './controllers/AuthMiddleware';
import { therapistData } from './controllers/TherapistDataController';
import { bookSession, fetchTodaysSessions, fetchPatientSessions } from './controllers/sessionManager';
import { createRoom, AuthenticatedRequest } from './controllers/VCControllers'
import { getStoredToken } from './controllers/token';

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
app.post('/signup', signup);
app.post('/signin', login);
app.post('/logout', logout);
app.post('/details', verifyToken, details);
app.post('/therapistData', verifyToken, therapistData);
app.post('/bookSession',verifyToken, bookSession);
app.post('/fetchTodaysSessions',verifyToken, fetchTodaysSessions);
app.post('/generate-token', verifyToken, (req, res) =>
  createRoom(req as unknown as AuthenticatedRequest, res)
);
app.post('/get-token', verifyToken, getStoredToken);
app.post('/fetchScheduledMeetings', verifyToken, fetchPatientSessions);

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
