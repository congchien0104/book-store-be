import express, { Router } from 'express';
import authRoute from './auth';
import bookRoute from './book';
import categoryRoute from './category';
import productRoute from './product';
import userRoute from './user';
import docsRoute from './swagger';
import config from '../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/books',
    route: bookRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
