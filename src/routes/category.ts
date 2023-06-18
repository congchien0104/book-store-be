import express, { Router } from 'express';
//import { validate } from '../../modules/validate';
//import { auth } from '../controllers/auth';
import { categoryController } from '../controllers/category';

const router: Router = express.Router();

router.get('/',categoryController.getCategories);

export default router;