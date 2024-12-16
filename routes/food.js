import express from 'express';

import { getAllFood } from '../controllers/foodController.js';

const router = express.Router();

//get All tour
router.get('/',getAllFood);

export default router;