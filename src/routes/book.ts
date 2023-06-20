import express, { Router } from 'express';
//import { validate } from '../../modules/validate';
import { auth } from '../controllers/auth';
import { bookController } from '../controllers/book';

const router: Router = express.Router();

router
  .route('/')
  .post(bookController.createBook);

router
  .route('/:bookId')
  .get(bookController.getBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;