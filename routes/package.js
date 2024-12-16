import express from 'express';

import {
    createPackage,
    deletePackage,
    getAllPackage
} from "../controllers/packageController.js";

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//create new tour
router.post('/',verifyUser, createPackage);

//delete tour
router.delete('/:id' ,verifyUser, deletePackage);

//get All tour
router.get('/', getAllPackage);

export default router;