import express, { Router } from 'express';
//import { validate } from '../../modules/validate';
import { auth } from '../controllers/auth';
import { productController } from '../controllers/product';

const router: Router = express.Router();

router
  .route('/')
  .post(productController.createProduct);

router
  .route('/:productId')
  .get(productController.getProduct)
  .put(auth('manageProducts'), productController.updateProduct)
  .delete(auth('manageProducts'), productController.deleteProduct);

export default router;