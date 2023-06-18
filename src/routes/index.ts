import express from 'express';

//import authentication from './authentication';
import category from './category';
import product from './product';
import user from './user';
import auth from './auth';

const router = express.Router();

export default (): express.Router => {
  //authentication(router);
  category(router);
  product(router);
  user(router);
  auth(router);

  return router;
};