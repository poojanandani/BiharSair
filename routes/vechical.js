import express from 'express';

import { getAllVechical } from '../controllers/vechicalController.js';

const router = express.Router();

//get All tour
router.get('/',getAllVechical);

export default router;