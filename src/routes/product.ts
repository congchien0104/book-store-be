import express from 'express';
import { productController } from '../controllers/product';

export default (router: express.Router) => {
  router.get('/products/:productId', productController.getProduct);
  router.post('/products', productController.createProduct);
  router.put('/products/:productId', productController.updateProduct);
  router.delete('/products/:productId', productController.deleteProduct);
};