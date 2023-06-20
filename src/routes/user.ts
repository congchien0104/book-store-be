import express, { Router } from 'express';
//import { validate } from '../../modules/validate';
import { auth } from '../controllers/auth';
import { userController } from '../controllers/user';

const router: Router = express.Router();

router
  .route('/')
  .get(userController.getUsers);

export default router;