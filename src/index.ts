// import connectDB from "./config/database";
// const express = require('express')
// const app = express()
// const port = 3000
// import routes from './routes';

// const router = express();
// connectDB();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// router.use('/categories', routes);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
// import express from 'express';
// import http from 'http';
// import bodyParser from 'body-parser';
// //import cookieParser from 'cookie-parser';
// //import compression from 'compression';
// //import cors from 'cors';

// import router from './routes';
// import mongoose from 'mongoose';

// const app = express();

// // app.use(cors({
// //   credentials: true,
// // }));

// // app.use(compression());
// // app.use(cookieParser());
// app.use(bodyParser.json());

// const server = http.createServer(app);

// server.listen(8080, () => {
//   console.log('Server running on http://localhost:8080/');
// });

// const MONGO_URL = 'mongodb://localhost:27017/book-store'; // DB URI

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));

// app.use('/', router());

import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import logger from '../src/logger/logger';

let server: any;
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
