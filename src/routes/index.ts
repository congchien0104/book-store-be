import express from 'express';

//import authentication from './authentication';
import category from './category';
import product from './product';

const router = express.Router();

export default (): express.Router => {
  //authentication(router);
  category(router);
  product(router);

  return router;
};