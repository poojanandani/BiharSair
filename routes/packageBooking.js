import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createPackageBooking,
        getAllPackageBooking,
        getPackageBooking
} from '../controllers/packageBookingController.js';

const router = express.Router();

router.post('/',verifyUser, createPackageBooking);
router.get("/:id", verifyUser, getPackageBooking);
router.get("/",verifyAdmin, getAllPackageBooking);

export default router;