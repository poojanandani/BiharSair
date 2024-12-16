import CustomTour from "../models/CustomTour.js";

//getAll tour
export const getAllCustomTour = async(req,res)=>{

    //for pagination
    const page = parseInt(req.query.page);

    try {
        const tours = await CustomTour.find({}).populate("reviews")
        .skip(page * 4).limit(12);

        res
            .status(200)
            .json({
            success: true,
            count: tours.length,
            message: "Successful",
            data:tours,})
    } catch (err) {
        res
        .status(404)
        .json({
            success:false, 
            message:"not found",
        });
    }
}
