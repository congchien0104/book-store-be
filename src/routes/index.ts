// import express from 'express';

// //import authentication from './authentication';
// import category from './category';
// import product from './product';
// import user from './user';
// import auth from './auth';

// const router = express.Router();

// export default (): express.Router => {
//   //authentication(router);
//   category(router);
//   product(router);
//   user(router);
//   auth(router);

//   return router;
// };

import express, { Router } from 'express';
import authRoute from './auth';
import categoryRoute from './category';
import productRoute from './product';
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
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
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
