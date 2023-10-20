import express from 'express';

import isLoggedIn from '../middleware/isLoggedIn.js';
import storeControllers from '../controllers/store.js';

const router = express.Router();

router.get('/', storeControllers.home);
router.get('/add-product-form', isLoggedIn, storeControllers.addProductForm);
router.post('/add-product', storeControllers.addProduct);

export default router;
