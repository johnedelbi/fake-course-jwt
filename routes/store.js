import express from 'express';

import verifyLogin from '../middleware/verifyLogin.js';
import storeControllers from '../controllers/store.js';

const router = express.Router();

router.get('/', storeControllers.home);
router.get('/add-product', verifyLogin, storeControllers.addProductForm);
router.post('/add-product', verifyLogin, storeControllers.addProduct);

export default router;
