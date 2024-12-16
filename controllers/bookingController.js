import Booking from "../models/Booking.js";
import { EMAIL_CONFIG } from "../utils/configure.js";
import nodemailer from "nodemailer";

//create new booking
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();

        // // Send email to user
        // const transporter = nodemailer.createTransport(EMAIL_CONFIG);
        // const mailOptions = {
        // from: 'navnitkmr05102003@gmail.com',
        // to: 'abhiraj100right@gmail.com',
        // subject: 'Booking Confirmation',
        // text: 'Your booking has been confirmed.'
        // }

        // await transporter.sendMail(mailOptions);

        res
            .status(200)
            .json({
                success:true,
                message:"Your tour is booked",
                data: savedBooking
            })

    } catch (error) {

        res
            .status(500)
            .json({
                success:false,
                message:"internal server error",
            })
            
    }
};

//get single booking
export const getBooking = async(req, res)=>{
    const id= req.params.id;

    try {
        const book = await Booking.findById(id);    

        res
            .status(200)
            .json({
                success:true,
                message:"Successful",
                data: book,
            })

    } catch (error) {
        res
            .status(404)
            .json({
                success:false,
                message:"not found",
            })
    }
};

//get all booking
export const getAllBooking = async(req, res)=>{

    try {
        const books = await Booking.find();    

        res
            .status(200)
            .json({
                success:true,
                message:"Successful",
                data: books,
            })

    } catch (error) {
        res
            .status(500)
            .json({
                success:false,
                message:"internal server error",
            })
    }
};