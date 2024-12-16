import express from 'express';
import { getAllCustomTour } from '../controllers/customTourController.js';

const router = express.Router();

//get All tour
router.get('/',getAllCustomTour);

export default router;