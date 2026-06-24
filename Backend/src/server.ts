import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

import connectDB from './controllers/DBController.js';
import { login, logout, signup } from './controllers/AuthControllers.js';
import { details } from './controllers/DetailsController.js';
import { verifyToken } from './controllers/AuthMiddleware.js';
import { therapistData } from './controllers/TherapistDataController.js';
import { bookSession, fetchTodaysSessions, fetchPatientSessions } from './controllers/sessionManager.js';
import { createRoom, AuthenticatedRequest } from './controllers/VCControllers.js'
import { getStoredToken } from './controllers/token.js';

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
app.post('/bookSession', verifyToken, bookSession);
app.post('/fetchTodaysSessions', verifyToken, fetchTodaysSessions);
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
