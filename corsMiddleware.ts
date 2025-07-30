import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:3000', 'https://krumandm.github.io'],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);