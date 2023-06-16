import express from 'express';
import { categoryController } from '../controllers/category';

export default (router: express.Router) => {
  router.get('/categories', categoryController.getCategories);
};