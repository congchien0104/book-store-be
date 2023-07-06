import express, { Router } from 'express';
//import { validate } from '../../modules/validate';
import { auth } from '../controllers/auth';
import { bookController } from '../controllers/book';

const router: Router = express.Router();

router
  .route('/')
  .get(bookController.getBooks)
  .post(auth('manageBooks'), bookController.createBook);

router
  .route('/:bookId')
  .get(bookController.getBook)
  .put(auth('manageBooks'), bookController.updateBook)
  .delete(auth('manageBooks'), bookController.deleteBook);

export default router;