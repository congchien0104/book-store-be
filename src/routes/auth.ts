import express from 'express';
import { authController } from '../controllers/auth';

export default (router: express.Router) => {
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.post('/logout', authController.logout);
};