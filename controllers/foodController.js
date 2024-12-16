import Food from "../models/Food.js";

//getAll tour
export const getAllFood = async(req,res)=>{

    //for pagination
    const page = parseInt(req.query.page);

    try {
        const tours = await Food.find({}).skip(page * 12).limit(12);

        res
            .status(200)
            .json({
            success: true,
            message: "Successful",
            data: tours
            });
    } catch (err) {
        res
        .status(404)
        .json({
            success:false, 
            message:"not found",
        });
    }
}
