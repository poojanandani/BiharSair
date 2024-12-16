import express from 'express';
import {
        deleteUser,
        getAllUser,
        getSingleUser,
        updateUser 
    } from '../controllers/userController.js';

// import Token from "../models/token.js";
// import sendEmail from "../utils/sendEmail.js";
// import crypto from "crypto";

const router = express.Router();

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

//update user
router.put('/:id',verifyUser, updateUser);

//delete user
router.delete('/:id',verifyUser, deleteUser);

//get Single user
router.get('/:id', getSingleUser);

//get All users
router.get('/', verifyAdmin, getAllUser);

export default router;