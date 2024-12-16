import PackageBooking from "../models/PackageBooking.js";

//create new booking
export const createPackageBooking = async(req,res)=>{
    const newBooking = new PackageBooking(req.body);
    try {
        const savedBooking = await newBooking.save();

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
export const getPackageBooking = async(req, res)=>{
    const id= req.params.id;

    try {
        const book = await PackageBooking.findById(id);    

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
export const getAllPackageBooking = async(req, res)=>{

    try {
        const books = await PackageBooking.find();    

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