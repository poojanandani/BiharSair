import mongoose from "mongoose";

const packageBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
    },
    tourName: {
        type: String,
        
    },
    foodName: {
        type: String,
    },
    vechicalName: {
        type: String,
    },
    hotelName: {
        type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
        type:Number,
        required: true,
    },
    phone: {
        type:Number,
        required: true,
    },
    bookAt: {
        type:Date,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PackageBooking", packageBookingSchema);
