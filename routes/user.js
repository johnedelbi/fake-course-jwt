import express from 'express';

import userControllers from '../controllers/user.js';

const router = express.Router();

router.get('/sign-up', userControllers.signUpForm);
router.get('/login', userControllers.loginForm);
router.post('/sign-up', userControllers.signUp);
router.post('/login', userControllers.logIn);
router.get('/log-out', userControllers.logOut);

export default router;
